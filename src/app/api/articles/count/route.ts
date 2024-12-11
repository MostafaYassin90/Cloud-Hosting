import { NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

/* 
** @Method Get
** @Route http://localhost:3000/api/articles/count
** @Desc Get Count Of Articles
** @Access Public
*/

export async function GET() {
  try {
    const articles = await prisma.article.count();
    return NextResponse.json({ count: articles }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }
}