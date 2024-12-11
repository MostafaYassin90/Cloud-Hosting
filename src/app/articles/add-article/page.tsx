"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

function AddArticle() {

  // State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Router
  const route = useRouter();

  // Hande Send New Article
  async function onSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const article = {
      title: title,
      description: description
    }

    try {
      await axios.post("http://localhost:3000/api/articles", article);
      route.push("/articles?pageNumber=1");
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="fix-height relative py-5 max-w-screen-xl mx-auto md:px-4">
      <h2 className="mb-5 text-xl font-bold">Add Article</h2>
      <form className="absolute w-full top-[35%] left-[50%] ml-[-50%]"
        onSubmit={onSubmitHandler}
      >
        <input type="text" placeholder="Title" value={title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value)
          }}
          className="block w-full p-2 h-11 rounded-md bg-gray-200 mb-5"
        />
        <input type="text" placeholder="Description" value={description}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setDescription(event.target.value)
          }}
          className="block w-full p-2 h-11 rounded-md bg-gray-200 mb-5"
        />
        <button type="submit" className="block w-fill p-2 w-[100px] rounded-xl mx-auto text-center 
        bg-[#006988] text-white">Add Artice</button>
      </form>
    </div>
  )
}
export default AddArticle;