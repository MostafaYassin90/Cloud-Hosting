"use client";
import { CommentAndUser } from "@/utils/servertypes";
import axios, { isAxiosError } from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import { useState } from "react";

type TProps = {
  comments: CommentAndUser[],
  userPayload: {
    id: number;
    username: string;
    isAdmin: boolean
  },
  articleId: string;
}

function CommentItems(props: TProps) {
  const { comments, userPayload, articleId } = props;
  const [showPopup, setShopPopup] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const [commentId, setCommentId] = useState<string | number>("");
  const router = useRouter();

  // Delete Handler
  const deleteHandler = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/comments/${id}`);
      console.log(response)
      router.refresh()
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message || error.message)
      } else {
        return toast.error("An UnExpected Error.")
      }
    }
  }

  // Fn To Get Single Comment
  const handleGetSingleComment = async (id: number, text: string) => {
    setShopPopup(true)
    setUpdateText(text);
    setCommentId(id);
  }

  // OnSubmitHandler
  const onSumbitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const updateComment = {
        text: updateText,
        articleId: + articleId
      }
      await axios.put(`http://localhost:3000/api/comments/${commentId}`, updateComment)
      router.refresh()
    } catch (error) {
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message || error.message)
      } else {
        return toast.error("An UnExpexted Error.")
      }
    }
  }

  const showComments = comments.length > 0
    ?
    comments.map((comment) => (
      <div className="w-full bg-gray-200 border border-gray-400 mb-5 p-5 rounded-xl"
        key={comment.id}>
        <div className="flex items-center justify-between mb-5">
          <strong>{comment.user.username}</strong>
          <span className="px-2 py-1 rounded-xl bg-gray-950 text-white">
            {new Date(comment.createdAt).toDateString()}
          </span>
        </div>
        <p>{comment.text}</p>
        {
          userPayload.id === comment.userId || userPayload.isAdmin === true
            ?
            <div className="flex gap-2 items-center justify-end mt-5">
              <FaEdit className="text-green-600 text-2xl cursor-pointer" onClick={() => {
                handleGetSingleComment(comment.id, comment.text)
              }} />
              <FaTrash className="text-red-600 text-2xl cursor-pointer"
                onClick={() => {
                  deleteHandler(comment.id)
                }} />
            </div>
            :
            null
        }
      </div>
    ))
    :
    <p>No Comments Found!</p>

  return (
    <>
      {
        showPopup ?
          <div className="popup">
            <form onSubmit={onSumbitHandler}>
              <span className="close" onClick={() => {
                setShopPopup(false)
              }}>x</span>
              <input type="text" placeholder="Type Your Text" name="updateText"
                value={updateText} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUpdateText(event.target.value)
                }}
              />
              <button type="submit">Update</button>
            </form>
          </div>
          :
          null
      }
      {showComments}
    </>
  )
}
export default CommentItems