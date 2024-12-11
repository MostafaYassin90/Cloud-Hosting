"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

function Logout() {

  // Router
  const router = useRouter();

  // Handle Logout
  const handleLogout = async () => {
    const response = await axios.get("http://localhost:3000/api/users/logout");
    await response.data;
    router.replace("/")
    router.refresh()
  }

  return (
    <button className="logout-auth-btn" onClick={() => {
      handleLogout()
    }}>Logout</button>
  )
}
export default Logout;