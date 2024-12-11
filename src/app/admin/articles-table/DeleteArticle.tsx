"use client";

import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


function DeleteArticle({ articleId }:
  { articleId: number }) {

  // Router
  const router = useRouter();

  // Delete Article Handler
  const deleteArticleHandler = async (articleId: number) => {
    try {
      if (window.confirm("Are Your Sure To Delete This Article")) {
        await axios.delete(`http://localhost:3000/api/articles/${articleId}`)
        toast.success("Deleted Successfully.")
        router.refresh();
      }
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error)
        toast.error(error.response?.data.message || error.message)
      } else {
        toast.error("An UnExpecte Error")
      }
    }
  }

  return (
    <button className="py-1 px-2 bg-red-950 text-white hover:bg-red-700 rounded-lg"
      onClick={() => {
        deleteArticleHandler(articleId)
      }}>
      Delete
    </button>
  )
}
export default DeleteArticle;