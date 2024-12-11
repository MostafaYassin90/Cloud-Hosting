import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/prismaClient";
import { z } from "zod";
import { TCreateArticle, TJwtPayload } from "@/utils/servertypes";
import jwt from "jsonwebtoken";

type TProps = {
  params: {
    id: string
  }
}
/* ************************************************ */
/* 
** @Method Get
** @Route http://localhost:3000/api/articles/:id
** @Desc Get A Single Article
** @Assecc Public
*/
export async function GET(request: NextRequest, props: TProps) {
  try {
    const { id } = props.params;
    const singleArticle = await prisma.article.findUnique({
      where: { id: +id },
      include: {
        comments: {
          include: {
            user: {
              select: {
                username: true
              }
            }
          },
          orderBy: {
            createdAt: "desc"
          }
        },
      }
    });
    if (!singleArticle) {
      return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
    };

    return NextResponse.json(singleArticle, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error ${error}` },
      { status: 500 })
  }
}
/* ************************************************ */
/* 
** @Method Put
** @Route http://localhost:3000/api/articles/:id
** @Desc Update A Single Article
** @Assecc Public
*/
export async function PUT(request: NextRequest, props: TProps) {
  try {
    // Check If User Have Authentication By Token
    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;

    if (!userToken) {
      return NextResponse.json({ message: "No Token Provided, Denied Access" }, { status: 401 })
    }

    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;

    if (!tokenPayload.isAdmin) {
      return NextResponse.json({ message: "You Don't Have Permission To Update This Article." },
        { status: 403 }
      )
    }

    const { id } = props.params;

    const singleArticle = await prisma.article.findUnique({ where: { id: +id } });

    if (!singleArticle) {
      return NextResponse.json({ message: "Article Not Found." }, { status: 404 })
    };

    // Get Data
    const body: TCreateArticle = await request.json();

    const schema = z.object({
      title: z.string({ required_error: "Title Is Required.", invalid_type_error: "Title Should Be String." }).min(2, { message: "Title Must Be At Least 2 Characters." }),
      description: z.string({ required_error: "Description Is Required.", invalid_type_error: "Description Should Be String." }).min(2, { message: "Description Must Be At Least 2 Characters." })
    });

    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 })
    };

    const UpdatedArticle = await prisma.article.update({
      where: { id: +id },
      data: {
        title: body.title,
        description: body.description
      }
    })
    return NextResponse.json({ UpdatedArticle, message: "Updated Successfully" }, { status: 200 })

  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error ${error}.` },
      { status: 500 })
  }
}
/* ************************************************ */
/* 
** @Method Delete
** @Route http://localhost:3000/api/articles/:id
** @Desc Delete A Single Article
** @Assecc Private
*/
export async function DELETE(request: NextRequest, props: TProps) {

  try {
    const userToken = request.cookies.get("Bearer");
    const token = userToken?.value as string;
    if (!userToken) {
      return NextResponse.json({ message: "No Token Provided, Access Denied" }, { status: 401 })
    }
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY as string) as TJwtPayload;
    if (tokenPayload.isAdmin === false) {
      return NextResponse.json({ message: "You Don't Have Permission To Delete The Article." }, {
        status: 403
      })
    }
    const { id } = props.params;
    const singleArticle = await prisma.article.findUnique({
      where: { id: +id },
      include: { comments: true }
    });
    if (!singleArticle) {
      return NextResponse.json({ message: "Data Not Found." }, { status: 404 })
    };

    // Delete Comments Thats Have Relationship With This Article
    const commentsIds: number[] = singleArticle.comments.map((comment) => comment.id);
    await prisma.comment.deleteMany({
      where: {
        id: { in: commentsIds }
      }
    })
    // Delete Article
    const deletedArticle = await prisma.article.delete({
      where: { id: +id }
    })

    return NextResponse.json({ deletedArticle, message: "Deleted Successfully" }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: `Internal Server Error ${error}.` }, { status: 500 })
  }

}

























/* ^^^^^^ */


// import { NextRequest, NextResponse } from "next/server";
// import { articles } from "@/utils/data";
// import { TUpdateArticle } from "@/utils/servertypes";



/* *************************************************** */
/*
** @Method GET
** @Route http://localhost:3000/api/articles/:id
** @Desc Get Single Article
** @Access Public
*/
// type TProps = {
//   params: {
//     id: string
//   }
// }
// export function GET(request: NextRequest, props: TProps) {
//   const { id } = props.params;
//   let singleArticle = articles.find((article) => article.id === +id);
//   if (!singleArticle) {
//     return NextResponse.json({ message: "Data Not Found" }, { status: 404 })
//   }
//   return NextResponse.json(singleArticle, { status: 200 })
// }
/* *************************************************** */

/*
** @Method PUT
** @Route http://localhost:3000/api/articles/:1
** @Desc Update Single Article By ID
** @Access Public
*/
// export async function PUT(request: NextRequest, props: TProps) {
//   const { id } = props.params;

//   let article = articles.find((article) => article.id === +id);

//   if (!article) {
//     return NextResponse.json({ message: "Data Not Found" }, { status: 404 })
//   }
//   let body = await request.json() as TUpdateArticle;
//   console.log(body);
//   return NextResponse.json({ message: "Updated Successfully" }, { status: 200 })
// }

/* *************************************************** */

/*
** @Method Delete
** @Route http://localhost:3000/api/articles/:id
** @Desc Delete Single Product By Id
** @Access Public
*/

// export function DELETE(request: NextRequest, props: TProps) {
//   let { id } = props.params;
//   let article = articles.find((article) => article.id === +id);

//   if (!article) {
//     return NextResponse.json({ message: "Data Not Found" }, { status: 404 })
//   }

//   return NextResponse.json({ message: "article Deleted" }, { status: 200 })

// } 
/* *************************************************** */
