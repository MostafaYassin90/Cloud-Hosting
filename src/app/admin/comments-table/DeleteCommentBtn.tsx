"use client";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/constants/constant";

function DeleteCommentBtn({ commentId }: { commentId: number }) {

  // Router
  const router = useRouter();

  // Delete Article Handler
  const deleteArticleHandler = async (commentId: number) => {
    try {
      if (window.confirm("Are You Sure You Want To Delete Comment")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`)
        router.refresh();
        toast.success("Deleted Successfully.")
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
        deleteArticleHandler(commentId)
      }}>
      Delete
    </button>
  )
}
export default DeleteCommentBtn;