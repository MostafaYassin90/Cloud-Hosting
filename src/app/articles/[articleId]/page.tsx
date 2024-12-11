import axios, { isAxiosError } from "axios";
import AddCommentForm from "./AddCommentForm";
import CommentItems from "./CommentItems";
import { TJwtPayload, TSingleArticle } from "@/utils/servertypes";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import "./SingleArticle.css";

type TProps = {
  params: {
    articleId: string
  }
}


// Funtion To Get Single Article
async function getSingleArticle(id: string) {
  try {
    const response = await axios.get(`http://localhost:3000/api/articles/${id}`)
    const data: TSingleArticle = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }
  }
}

// The Main Function Component
async function SingleArticle(props: TProps) {
  const { articleId } = props.params;
  const article = await getSingleArticle(articleId) as TSingleArticle;
  const articleComments = article.comments;

  await new Promise((resolve) => setTimeout(resolve, 2000))

  // Get Token
  const userToken = cookies().get("Bearer");
  const token = userToken?.value as string;
  const secretKey = process.env.SECRET_KEY as string;
  const jwtPayload = jwt.verify(token, secretKey) as TJwtPayload;

  return (
    <div className=" fix-height max-w-screen-xl mx-auto py-20">
      <div className="p-5 rounded w-full text-center bg-gray-200 mb-5 relative" key={article.id}>
        <div className="absolute top-[10px] left-[20px] bg-black text-white py-1 px-3 font-bold rounded-xl">ID: {article.id}</div>
        <h4 className="text-3xl font-bold">{article.title}</h4>
        <p className="mt-3 font-semibold text-xl">{article.description}</p>
      </div>
      {
        userToken
          ?
          <AddCommentForm idForArticle={article.id} />
          :
          null
      }
      <h4 className="text-3xl font-bold mb-3">Comments</h4>
      <CommentItems comments={articleComments} userPayload={jwtPayload}
        articleId={articleId}
      />
    </div>
  )
}
export default SingleArticle;