import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/prismaClient";
import jwt from "jsonwebtoken";
import { TCreateUser, TJwtPayload } from "@/utils/servertypes";
import { z } from "zod";
import bcrypt from 'bcryptjs';

type TProps = {
  params: {
    id: string
  }
}
/* ****************************************************** */
/* 
** @Method Delete
** @Route http://localhost:3000/api/profil/:id
** @Desc Delete User 
** @Access Private [ Need Authorization ]
// https:localhost:3000/api/users/1
*/

export async function DELETE(request: NextRequest, props: TProps) {

  try {
    const { id } = props.params;

    const findUser = await prisma.user.findUnique({
      where: { id: +id },
      include: { comments: true }
    });

    if (!findUser) {
      return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
    };

    // Get Token Of Current User
    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;

    if (!userToken) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }; // un Authorized

    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload

    if (tokenPayload.id === findUser.id) {
      const commentsIds: number[] = findUser.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentsIds } } })

      // Delete User
      const deleteUser = await prisma.user.delete({ where: { id: +id } });
      return NextResponse.json({ deleteUser, message: "Deleted Successfully" }, { status: 200 })
    };

    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  };
}

/* ****************************************************** */
/* 
** @Method Get
** @Route http://localhost:3000/api/profile/:id
** @Desc Get Current User By Id
** @Access Private
*/
export async function GET(request: NextRequest, props: TProps) {

  const { id } = props.params;

  const userProfile = await prisma.user.findUnique({
    where: { id: +id },
    select: {
      id: true,
      username: true,
      email: true,
      isAdmin: true,
      createdAt: true,
      updatedAt: true
    }
  });

  if (!userProfile) {
    return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
  };

  const userToken = request.cookies.get("Bearer");
  const token = userToken?.value as string;

  if (!userToken) {
    return NextResponse.json({ message: "No Token Provided, Access Denied" }, { status: 401 })
  };

  const checkTokenId = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload

  if (checkTokenId.id === userProfile.id) {
    return NextResponse.json(userProfile, { status: 200 })
  }
  return NextResponse.json({ message: "You Don't Have Permission To Access This Resource, Forbidden" }, { status: 403 })

}

/* ****************************************************** */
/* 
** @Method Put
** @Route http://localhost:3000/api/profile/:id
** @Desc Update Current User By Id
** @Access Private
*/

export async function PUT(request: NextRequest, props: TProps) {
  const { id } = props.params;
  const findUser = await prisma.user.findUnique({
    where: { id: +id }
  });
  if (!findUser) {
    return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
  };

  const body: TCreateUser = await request.json();

  const schema = z.object({
    username: z.optional(z.string({ required_error: "Username Is Required." }).min(2, { message: "Username Must Be At Least 2 Characters." }).max(100)),
    email: z.optional(z.string({ required_error: "Email Is Required." }).email({ message: "Invalid Email." })),
    password: z.optional(z.string({ required_error: "Password Is Required." }).min(6, { message: "Password Must Be At Least 6 Characters." }))
  });
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json({ message: validation.error.errors[0].message }, { status: 200 })
  };

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(body.password, salt);

  const userToken = request.cookies.get("Bearer");
  const token = userToken?.value as string;

  if (!userToken) {
    return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
  };

  const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;

  if (tokenPayload.id === findUser.id) {
    const updatedUser = await prisma.user.update({
      where: { id: +id },
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword
      },
      select: {
        id: true,
        username: true,
        email: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true
      }
    })
    return NextResponse.json(updatedUser, { status: 200 })
  }
  return NextResponse.json({ message: "Forbidden" }, { status: 403 })

}


