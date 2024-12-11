"use client";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { DOMAIN } from "../../constants/constant";

function DeleteButton({ id, route }: { id: number, route: string }) {

  // Router
  const router = useRouter();

  // Delete Article Handler
  const deleteArticleHandler = async (id: number) => {
    try {
      const response = await axios.delete(`${DOMAIN}/api/${route}/${id}`)
      console.log(response)
      router.refresh();
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
        deleteArticleHandler(id)
      }}>
      Delete
    </button>
  )
}
export default DeleteButton;