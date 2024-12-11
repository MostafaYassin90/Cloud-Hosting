"use client"
import Link from "next/link";

type TProps = {
  pages: number;
  pageNumber: string;
  route: string
}


function ArticlesPagination(props: TProps) {
  const { pages, pageNumber, route } = props;
  const countOfPage = Math.ceil(pages / 6); // 5
  const arrOfPages = [];
  for (let i = 1; i <= countOfPage; i++) {
    arrOfPages.push(i)
  }


  return (
    <div className="flex items-center justify-center">
      <ul className="p-0 m-0 flex border text-center border-gray-900 items-center justify-center">
        {
          +pageNumber !== 1 &&
          <Link
            href={`${route}?pageNumber=${+pageNumber > 1 && +pageNumber - 1}`}
            className="cursor-pointer text-lg p-2 border border-r-black">Prev</Link>
        }
        {
          arrOfPages.map((page) => (
            <Link href={`${route}?pageNumber=${page}`}
              key={page} className={`text-center h-full cursor-pointer 
            py-2 text-lg w-10 border-r-black border ${page === +pageNumber && "bg-black text-white"}`}>
              {page}
            </Link>
          ))
        }
        {
          +pageNumber !== countOfPage &&
          <Link
            href={`${route}?pageNumber=${+pageNumber < countOfPage && +pageNumber + 1}`}
            className="cursor-pointer text-lg p-2">Next</Link>
        }
      </ul>
    </div >
  )
}
export default ArticlesPagination