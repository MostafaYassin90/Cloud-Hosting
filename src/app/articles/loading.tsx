import Link from "next/link";

function ArticlesLoading() {
  return (
    <div className="fix-height py-5 max-w-screen-xl mx-auto animate-pulse">
      <h2 className="mb-5 text-bold text-gray-900 text-3xl">Articles</h2>
      <div className="py-5 w-full">
        <form className="w-fill">
          <input type="text" className="p-3 rounded-xl block w-full bg-gray-400" />
        </form>
      </div>
      <div className="p-5 h-fit rounded w-full bg-gray-200 mb-5">
        <div className="h-2 mb-1 bg-gray-400 w-[20%]"></div>
        <h4 className="h-2 mb-1 bg-gray-400 w-[20%]"></h4>
        <p className="h-2 mb-1 bg-gray-400 w-[20%]"></p>
        <Link href={`#`} className="block bg-black w-fit text-white p-2 mx-auto rounded mt-3">View Article</Link>
      </div>
      <div className="p-5 h-fit rounded w-full bg-gray-200 mb-5">
        <div className="h-2 mb-1 bg-gray-400 w-[20%]"></div>
        <h4 className="h-2 mb-1 bg-gray-400 w-[20%]"></h4>
        <p className="h-2 mb-1 bg-gray-400 w-[20%]"></p>
        <Link href={`#`} className="block bg-black w-fit text-white p-2 mx-auto rounded mt-3">View Article</Link>
      </div>
      <div className="p-5 h-fit rounded w-full bg-gray-200 mb-5">
        <div className="h-2 mb-1 bg-gray-400 w-[20%]"></div>
        <h4 className="h-2 mb-1 bg-gray-400 w-[20%]"></h4>
        <p className="h-2 mb-1 bg-gray-400 w-[20%]"></p>
        <Link href={`#`} className="block bg-black w-fit text-white p-2 mx-auto rounded mt-3">View Article</Link>
      </div>
    </div>
  )
}
export default ArticlesLoading;