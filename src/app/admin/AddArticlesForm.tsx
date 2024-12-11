"use client";
import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/Loading/Loading";

function AddArticlesForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  // Handle OnSubmitForm
  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title === "") return toast.error("Title Is Required");
    if (description === "") return toast.error("Description Is Required");
    setLoading(true);
    const articleData = {
      title: title,
      description: description
    }
    try {
      await axios.post("http://localhost:3000/api/articles", articleData);
      router.refresh()
      setLoading(false);
      toast.success("New Article Added.")
    } catch (error) {
      setLoading(false);
      if (isAxiosError(error)) {
        return toast.error(error.response?.data.message || error.message)
      } else {
        return toast.error("An UnExpected Error.")
      }
    }
  }


  return (
    <>
      {
        loading
          ?
          <LoadingPage />
          :
          <form onSubmit={onSubmitHandler}>
            <input type="text" placeholder="Type Articles" className="mb-5 p-3 rounded-md block w-full"
              value={title} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value)
              }}
            />
            <textarea className="rounded-md resize-none block w-full mb-5 p-3"
              rows={5} value={description} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                setDescription(event.target.value)
              }}
            />
            <button type="submit" className="block mx-auto w-[200px] p-2 text-xl font-semibold  bg-black rounded-xl text-white">Add</button>
          </form>
      }
    </>
  )
}
export default AddArticlesForm;