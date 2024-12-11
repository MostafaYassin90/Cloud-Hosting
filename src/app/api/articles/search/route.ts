import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";

/* 
** @Method Get
** @Route http://localhost:3000/api/articles/search?searchText=value
** @Desc Get Article By Search Text
** @Access Public
*/

export async function GET(reuqest: NextRequest) {

  try {
    const searchText = reuqest.nextUrl.searchParams.get("searchText");
    let article;
    if (searchText) {
      article = await prisma.article.findMany({
        where:
        {
          title: { startsWith: searchText, mode: "insensitive" }
        }
      })
    } else {
      article = await prisma.article.findMany({ skip: 0, take: 6 })
    }
    return NextResponse.json(article, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }

}

















// const articlesResult =
//   articles.filter((article) => article.title.toLowerCase().includes(searchTitle));