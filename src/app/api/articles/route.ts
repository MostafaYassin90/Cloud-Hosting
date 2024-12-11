import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { TCreateArticle, TJwtPayload } from "@/utils/servertypes";
import { z } from "zod";
import jwt from 'jsonwebtoken';

/* ********************************************* */
/* 
** @Method Post
** @Route http://localhost:3000/api/articles
** @Desc Create A New Article
** @Access Public
*/

export async function POST(request: NextRequest) {

  try {
    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;

    if (!token) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;
    if (tokenPayload.isAdmin === false) {
      return NextResponse.json({ message: "You Don't Have Permission To Create Article, Forbidden." }, { status: 403 })
    }

    const body: TCreateArticle = await request.json();

    const schema = z.object({
      title: z.string({ required_error: "Title Is Required.", invalid_type_error: "Title Should Be String." }).min(2, { message: "Title Must Be At Least 2 Characters." }),
      description: z.string({ required_error: "Description Is Required.", invalid_type_error: "Description Should Be String." }).min(2, { message: "Description Must Be At Least 2 Characters." })
    });

    const validation = schema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    };

    // Create A New Article
    const newArticle = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description
      }
    })

    return NextResponse.json({ newArticle, mesage: "Created Successfully" }, { status: 201 });
  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  }

}

/* ********************************************* */
/* 
** @Method Get
** @Route http:localhost:3000/api/articles
** @Desc Get All Articles
** @Access Public
*/
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
    const articles_per_page = 6;
    const articles = await prisma.article.findMany({
      skip: articles_per_page * (+pageNumber - 1),
      take: articles_per_page,
      include: {
        comments: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(articles, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error ${error}.` },
      { status: 500 })
  }
}
/* ********************************************* */
