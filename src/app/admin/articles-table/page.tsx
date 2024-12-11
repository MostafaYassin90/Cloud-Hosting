import axios from "axios";
import { Article } from "@prisma/client";
import Link from "next/link";
import ArticlesPagination from "@/app/articles/ArticlesPagination";
import DeleteArticle from "./DeleteArticle";
import prisma from "@/utils/prismaClient";

// Type Of Props
type TProps = {
  searchParams: {
    pageNumber: string
  }
}


// Get Article Based On PageNumber
const getArticle = async (pageNumber: string) => {
  const response = await axios.get(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`)
  const data: Article[] = response.data;
  return data;
}

async function AdminArticlesTable({ searchParams: { pageNumber } }: TProps) {
  const artciles = await getArticle(pageNumber) as Article[];
  const articleCount = await prisma.article.count();

  // Show Articles
  const showArticles = artciles.map((article, index) => (
    <tr key={article.id} className="border-t border-slate-950">
      <td className="p-2">{index + 1}</td>
      <td>{article.title}</td>
      <td>{new Date(article.createdAt).toDateString()}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/articles-table/edit?articleId=${article.id}`}
            className="px-3 py-1 bg-green-950 text-white rounded-lg hover:bg-green-700"
          >Edit</Link>
          <DeleteArticle articleId={article.id} />
        </div>
      </td>
      <td>
        <Link href={`/articles/${article.id}`}
          className="p-2 bg-blue-950 hover:bg-blue-700 text-white rounded-lg"
        >Read More</Link>
      </td>
    </tr>
  ))

  return (
    <div className="py-5">
      <h3 className="mb-5">Articles</h3>
      <table className="w-full bg-[#eee] p-3 text-center mb-5">
        <thead>
          <tr className="border-b border-slate-950 bg-slate-900 text-white">
            <th className="py-2">#</th>
            <th className="py-2">Title</th>
            <th className="py-2">CreatedAt</th>
            <th className="py-2">Action</th>
            <th className="py-2">Article Details</th>
          </tr>
        </thead>
        <tbody>
          {showArticles}
        </tbody>
      </table>
      <ArticlesPagination
        pages={articleCount}
        pageNumber={pageNumber}
        route={"/admin/articles-table"}
      />
    </div>
  )
}
export default AdminArticlesTable;