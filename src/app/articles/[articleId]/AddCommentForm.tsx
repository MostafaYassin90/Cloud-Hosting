"use client";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type TProps = {
  idForArticle: number,
};

function AddCommentForm(props: TProps) {

  const { idForArticle } = props;
  const [commentText, setCommentText] = useState("");


  const router = useRouter();

  // OnSubmit Handler
  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!commentText) {
      return toast.error("Please Type Your Comment!")
    }
    const comment = {
      text: commentText,
      articleId: idForArticle
    }
    try {
      await axios.post("http://localhost:3000/api/comments", comment)
      router.refresh()
      setCommentText("")
    } catch (error) {
      console.log(error)
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message || error.message)
      } else {
        toast.error("An UnExpecred Error.")
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="w-full mt-5">
      <input type="text" placeholder="Add A Comment..."
        value={commentText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setCommentText(event.target.value)
        }}
        className="block w-full px-2 py-3 rounded-xl border-2 border-gray-200 bg-gray-200 border-solid mb-3"
      />
      <button type="submit" className="block mx-auto p-2 rounded-xl bg-green-950 text-white">
        Add A Comment
      </button>
    </form>
  )
}
export default AddCommentForm;