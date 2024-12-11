import AddArticlesForm from "./AddArticlesForm";

function AdminPage() {
  return (
    <div className="flex items-center justify-center p-3 fix-height">
      <div className="w-full bg-gray-200 p-5 rounded-r-lg shadow">
        <h3 className="mb-5 text-2xl font-semibold">Add New Articles</h3>
        <AddArticlesForm />
      </div>
    </div >
  )
}
export default AdminPage;