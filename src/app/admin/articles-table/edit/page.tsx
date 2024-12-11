import EditArticleForm from "@/components/EditArticle/EditArticle";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Article } from "@prisma/client";
type TProps = {
  searchParams: {
    articleId: number
  }
}
// Get Single Article By ID
const getSingleArticle = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/articles/${id}`)
    const data: Article = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error)
      toast.error(error.response?.data.message || error.message)
    } else {
      toast.error("An Unexpected Error.")
    }
  }
}

async function EditArticle(props: TProps) {
  const { articleId } = props.searchParams;
  const singleArticle = await getSingleArticle(articleId) as Article;

  return (
    <div className="edit-artice py-5">
      <h3 className="mb-5 text-2xl font-bold"> Edit Article</h3>
      <EditArticleForm singleArticle={singleArticle} />
    </div>
  )
}
export default EditArticle;