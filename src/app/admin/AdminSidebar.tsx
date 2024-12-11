import Link from "next/link";
import { CgMenuGridR } from "react-icons/cg";
import { FaBookOpen } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";

function AdminSideBar() {
  return (
    <>
      <Link href="/admin" className="mb-5 text-xl font-bold flex flex-row items-center">
        <CgMenuGridR className="text-3xl me-1" />
        <span className="hidden lg:block">DashBoard</span>
      </Link>
      <ul className="p-0 m-0 list-none">
        <Link href="/admin/articles-table?pageNumber=1" className="text-blue-950 text-xl mb-4 flex flex-row items-center">
          <FaBookOpen className="text-2xl me-1" />
          <span className="hidden lg:block">Articles</span>
        </Link>
        <Link href="/admin/comments-table" className="text-blue-950 text-xl mb-4 flex flex-row items-center">
          <FaCommentDots className="text-2xl me-1" />
          <span className="hidden lg:block">Comments</span>
        </Link>
      </ul>
    </>
  )
}
export default AdminSideBar;