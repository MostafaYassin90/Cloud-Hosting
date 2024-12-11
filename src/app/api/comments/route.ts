import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { TCreateComment, TJwtPayload } from "@/utils/servertypes";
import { z } from "zod";
import jwt from 'jsonwebtoken';

/* **************************************************************** */
/* 
** @Method Post
** @Route http://localhost:3000/api/comments
** @Desc Create A New Comment
** @Access Public
*/
export async function POST(request: NextRequest) {
  try {
    const userToken = request.cookies.get("Bearer");

    const token = userToken?.value as string;
    console.log(token)
    if (!token) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }; // un Authorized

    const body: TCreateComment = await request.json();

    const schema = z.object({
      text: z.string({ required_error: "Text Is Required" }).min(2, { message: "Text Must Be At Least 2 Characters." }),
      articleId: z.number()
    });

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    };

    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;
    const newComment = await prisma.comment.create({
      data: {
        text: body.text,
        articleId: body.articleId,
        userId: tokenPayload.id
      },
      include: {
        article: true,
        user: true
      }
    })
    return NextResponse.json(newComment, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }
}
/* **************************************************************** */
/* 
** @Method Get
** @Route http://localhost:3000/api/comments
** @Desc Get All Comments
** @Access Public
*/
export async function GET(request: NextRequest) {
  try {
    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;
    console.log(token)
    if (!userToken) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    } // UnAuthorized
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;
    if (tokenPayload.isAdmin === false) {
      return NextResponse.json(
        { message: "You Dont Have Permission To Access This Resource, Forbidden" },
        { status: 403 }
      )
    };
    const comments = await prisma.comment.findMany();
    return NextResponse.json(comments, { status: 200 });
  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  };
}
