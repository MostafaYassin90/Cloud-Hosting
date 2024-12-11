import { cookies } from "next/headers";
import Link from "next/link";
import Logout from "../Logout/Logout";
import { verifyUserPayload } from "@/utils/verifyToken";
import "./Header.css";


async function Header() {

  const tokenInCookie = cookies().get("Bearer");
  const token = tokenInCookie?.value as string;
  const userPayload = verifyUserPayload(token)

  return (
    <div className="header">
      <div className="container sm:px-5 max-w-screen-xl md:px-5 mx-auto h-[70px] flex items-center justify-between">

        {/* Logo */}
        <div className="logo">
          <a href="#">E-Ecmmerce</a>
        </div>

        {/* nav */}
        <div className="header-nav">
          <ul className="links">
            <li><Link href="/" >Home</Link></li>
            <li><Link href="/#">Porducts</Link></li>
            <li><Link href="/articles?pageNumber=1">Articles</Link></li>
            {
              userPayload?.isAdmin && <li><Link href="/admin">DashBoard</Link></li>
            }
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        {/* Auth */}
        <div className="app-auth">
          {
            token
              ?
              <div className="holder-profile">
                <div>
                  <h2>{userPayload && userPayload!.username}</h2>
                </div>
                <Logout />
              </div>
              :
              <>
                <Link href={"/register"} className="register-auth-btn">Regisert</Link>
                <Link href={"/login"} className="login-auth-btn">Login</Link>
              </>
          }
        </div>

      </div>
    </div>
  )
}
export default Header;