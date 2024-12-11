import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import jwt from "jsonwebtoken";
import { TJwtPayload, TUpdateComment } from "@/utils/servertypes";
import { z } from "zod";

type TProps = {
  params: {
    id: string
  }
}
/* ******************************************************* */
/* 
** @Method Get
** @Route http://localhost:3000/api/comments/:id
** @Desc Get Single Comment
** @Access Private
*/

export async function GET(request: NextRequest, props: TProps) {
  const { id } = props.params;
  const comment = await prisma.comment.findUnique({ where: { id: +id } });

  if (!comment) {
    return NextResponse.json({ message: "Comment Not Found." }, { status: 404 })
  };

  const userToken = request.cookies.get("Bearer");
  const token = userToken?.value;

  if (!token) {
    return NextResponse.json({ message: "No Token Provided, Acces Denied " }, { status: 401 })
  };

  return NextResponse.json(comment, { status: 200 })


}

/* ******************************************************* */
/* 
** @Method Put
** @Route http://localhost:3000/api/comments/:id
** @Desc Update Single Comment
** @Access Private
http://localhost:3000/api/comments/1
token => id
*/

export async function PUT(requtes: NextRequest, props: TProps) {
  try {
    const { id } = props.params; // 8
    const comment = await prisma.comment.findUnique({ where: { id: +id } }); //8
    if (!comment) {
      return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
    };
    const userToken = requtes.cookies.get("Bearer");
    const token = userToken?.value as string;
    if (!token) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }; // UnAuthorized
    const body: TUpdateComment = await requtes.json();
    const schema = z.object({
      text: z.optional(z.string({ required_error: "Text Is Required." }).min(2, { message: "Text Must Be At Least 2 Characters." })),
      articleId: z.optional(z.number())
    });
    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    };

    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;

    if (tokenPayload.id === comment.userId) {
      const updatedComment = await prisma.comment.update({
        where: { id: +id },
        data: {
          text: body.text
        }
      });
      return NextResponse.json(updatedComment, { status: 200 })
    }
    return NextResponse.json({ message: "You Don't Have Permission To Update This Source, Forbidden" }, { status: 403 })
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }
}

/* ******************************************************* */
/* 
** @Method Delete
** @Route http://localhost:3000/api/comments/:id
** @Desc Delete Single Comment
** @Access Private
*/
export async function DELETE(request: NextRequest, props: TProps) {

  try {
    const { id } = props.params;

    const comment = await prisma.comment.findUnique({ where: { id: +id } });

    if (!comment) {
      return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
    };

    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;

    if (!token) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }

    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;

    if (tokenPayload.id === comment.userId || tokenPayload.isAdmin === true) {
      await prisma.comment.delete({ where: { id: +id } })
      return NextResponse.json({ message: "Deleted Successfully." }, { status: 200 })
    };

    return NextResponse.json({ message: "You Don't Have Permission To Delete This Comment, Forbidden." }, { status: 403 })
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }


}