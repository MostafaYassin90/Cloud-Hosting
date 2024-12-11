"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SearchFormArticles() {

  // State
  const [searchText, setSearchText] = useState("");

  // Router
  const router = useRouter();

  // Function onSubmitHanlde
  async function onSubmitHanlde(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    router.replace(`/articles/search?searctText=${searchText}`)
  }

  return (
    <div className="py-5 w-full">
      <form onSubmit={onSubmitHanlde} className="w-fill h-15 flex items-center bg-white">
        <input
          type="text"
          placeholder="Search For Articles"
          value={searchText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value)
          }}
          className="p-3 text-xl font-semibold w-full block h-15"
        />
        <button type="submit" className="w-[100px] bg-black text-white h-[52px] block">Search</button>
      </form>
    </div>
  )
}
export default SearchFormArticles;