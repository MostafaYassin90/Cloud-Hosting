import SearchFormArticles from "./SearchArticles";
import ArticlesPagination from "./ArticlesPagination";
import Link from "next/link";
import { Article } from "@prisma/client";
import ArticlesItems from "@/components/ArticlesItems/ArticlesItems";
import prisma from "@/utils/prismaClient";
import "./Articles.css";

type TProps = {
  searchParams: {
    pageNumber: string
  }
}
// Fn To Get Articles
async function getArticles(pageNumber: string): Promise<Article[]> {
  const response = await fetch(`http://localhost:3000/api/articles?pageNumber=${pageNumber}`,
    {
      cache: "no-store"
    }
  );
  const articles: Article[] = await response.json();
  return articles;
}

//  The Main Function
async function Articles(props: TProps) {

  const { pageNumber } = props.searchParams || "1";
  const articles = await getArticles(pageNumber);
  const articlesCount = await prisma.article.count();
  const pages = articlesCount;

  return (
    <div className="articles">
      <div className="container max-w-screen-xl mx-auto">
        <h2 className="mb-5 text-bold text-gray-900 text-3xl">Articles</h2>
        <Link href={"/articles/add-article"} className="block w-fit bg-[#009688] text-white font-bold py-1 px-3 rounded-md">Add Article</Link>
        {/* Search Form Artcles Articles */}
        <SearchFormArticles />
        {/* Show Articles */}
        <ArticlesItems articles={articles} />
        {/* Pagination */}
        <ArticlesPagination pages={pages} pageNumber={pageNumber}
          route={"/articles"}
        />
      </div>
    </div>
  )
}
export default Articles;
