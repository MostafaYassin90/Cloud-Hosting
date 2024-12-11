import { Article } from "@prisma/client";
import Link from "next/link";

type TProps = {
  articles: Article[]
}

function ArticlesItems(props: TProps) {
  const { articles } = props;

  const showArticles = articles.map((article) => (
    <div className="article" key={article.id}>
      <div className="absolute top-[10px] left-[20px] bg-black text-white py-1 px-3 font-bold rounded-xl">ID: {article.id}</div>
      <h4 className="text-3xl font-bold">{article.title}</h4>
      <p className="desc mt-3 font-semibold text-xl">{article.description}</p>
      <Link href={`/articles/${article.id}`} className="block bg-black w-fit text-white p-2 mx-auto rounded mt-3">View Article</Link>
    </div>
  ))

  return (
    <div className="holder-articles">
      {showArticles}
    </div>
  );
}
export default ArticlesItems;