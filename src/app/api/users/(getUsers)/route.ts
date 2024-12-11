import { NextResponse } from 'next/server';
import prisma from '@/utils/prismaClient';

/* 
** @Method Get
** @Route http://localhost:3000/api/user
** @Desc Get All Users
** @Access Public
*/
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        comments: true
      }
    });

    return NextResponse.json(users, { status: 200 });

  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }
}