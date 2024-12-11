"use client";
import { useState } from "react";
import { Article } from "@prisma/client";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoadingPage from "../../components/Loading/Loading";
import "./EditArticle.css";

type TProps = {
  singleArticle: Article
}


function EditArticleForm(props: TProps) {
  const singleArticle = props.singleArticle;
  const [title, setTitle] = useState(singleArticle.title);
  const [description, setDescription] = useState(singleArticle.description);
  const [loading, setLoading] = useState<boolean>(false);
  // Router
  const router = useRouter();

  // OnSubmit Handler
  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedArticle = {
      title: title,
      description: description
    };
    setLoading(true)
    try {
      await axios.put(`http://localhost:3000/api/articles/${singleArticle.id}`,
        updatedArticle
      );
      router.push("/admin/articles-table?pageNumber=1")
      router.refresh();
      setLoading(false);
    } catch (error) {
      setLoading(false)
      if (isAxiosError(error)) {
        console.log(error)
        toast.error(error.response?.data.message || error.message)
      } else {
        toast.error("An Unexpected Error.");
      };
    };
  };

  return (
    <>
      {
        loading
          ?
          <LoadingPage />
          :
          <form onSubmit={onSubmitHandler}>
            <div className="holder-field">
              <label htmlFor="title">Title</label>
              <input type="text" placeholder="Title" id="title" value={title}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value)
                }}
              />
            </div>
            <div className="holder-field">
              <label htmlFor="description">Description</label>
              <input type="text" placeholder="Description" id="description" value={description}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setDescription(event.target.value)
                }}
              />
            </div>
            <button className="update-btn">Update</button>
          </form>
      }
    </>
  )
}
export default EditArticleForm;