import { Article } from "@prisma/client"
import axios from "axios"
import ArticlesItems from "@/components/ArticlesItems/ArticlesItems";
import "./Search.css";

type TProps = {
  searchParams: {
    searctText: string
  }
}

// Get Search Article
const getSearchArticle = async (title: string) => {
  const response = await axios.get(`http://localhost:3000/api/articles/search?searchText=${title}`)
  const data: Article[] = await response.data
  return data;
}


async function SearchArticlesPage(props: TProps) {
  const { searctText } = props.searchParams;
  const articles: Article[] = await getSearchArticle(searctText);

  return (
    <div className="search-articles-page fix-height py-5 max-w-screen-xl mx-auto">
      <h2 className="text-2xl font-bold">Search Articles BasedOn {searctText.toUpperCase()}</h2>
      <ArticlesItems articles={articles} />
    </div>
  )
}
export default SearchArticlesPage;