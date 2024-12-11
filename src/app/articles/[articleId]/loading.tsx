function SingleArticleLoading() {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto container py-5">
        {/* Single Article */}
        <div className="text-center h-20 relative p-5 rounded-md bg-gray-300 animate-pulse">
          <span className="absolute top-3 left-3 w-5 h-5 bg-dark rounded-xl"></span>
          <h2 className="w-5 h-5"></h2>
          <p className="w-20 h-5"></p>
        </div>
        {/* Single Article */}
        {/* Form Article */}
        <div className="mt-5 animate-pulse">
          <div className="h-20 w-full bg-gray-200"></div>
          <div className="h-5 w-20 bg-green-200 mx-auto mt-5"></div>
        </div>
        {/* Form Article */}
        <div className="w-30 h-5 mb-5 bg-gray-200 rounded-lg animate-pulse"></div>
        {/* Comment */}
        <div className="bg-gray-200 p-5 w-full h-40 animate-pulse rounded-lg mb-5"></div>
        <div className="bg-gray-200 p-5 w-full h-40 animate-pulse rounded-lg mb-5"></div>
        <div className="bg-gray-200 p-5 w-full h-40 animate-pulse rounded-lg mb-5"></div>
        {/* Comment */}
      </div>
    </div>
  )
}
export default SingleArticleLoading;