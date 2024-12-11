import { verifyUserPayload } from "@/utils/verifyToken";
import AdminSideBar from "./AdminSidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type TProps = {
  children: React.ReactNode
}

function AdminLayout(props: TProps) {
  const { children } = props;

  const userToken = cookies().get("Bearer");
  const token = userToken?.value as string;
  const jwtPayload = verifyUserPayload(token)

  if (jwtPayload?.isAdmin === false || !token) {
    redirect("/")
  }


  return (
    <div className="admin overlay-height flex">
      <div className="sidebar w-15 lg:w-1/5 p-5 bg-gray-200 overflow-hidden">
        <AdminSideBar />
      </div>
      <div className="content w-full px-5 overflow-y-scroll">
        {children}
      </div>
    </div>
  )
}
export default AdminLayout;