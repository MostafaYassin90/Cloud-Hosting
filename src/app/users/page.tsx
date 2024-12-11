import axios, { isAxiosError } from "axios";
import styles from "./styles.module.css";
import { TUsers } from "@/dataType";
import { Metadata } from "next";
import Link from "next/link";

// MetaData
export const metadata: Metadata = {
  title: "Users Page",
  description: "The Page Custom Created For Display Users"
}

// Get Users 
async function getUsers() {
  try {
    const response = await axios.get("http://localhost:9000/users");
    const data: TUsers[] = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.message || error.response?.data
    }
  }
}

// Main Function
async function Users() {
  const users: (TUsers[] | string) = await getUsers();

  //  Show Users
  const showUsers =
    typeof users === "string"
      ?
      <div className="text-center py-5 text-gray-900"><h2>{users}</h2></div>
      :
      users.map((user) => (
        <div className={styles.user} key={user.id}>
          <h2 className={styles.name}>UserName: {user.name}</h2>
          <p className={styles.email}>Email: {user.email}</p>
          <p className={styles.address}>Address: Street:{user.address.street} Suite: {user.address.suit}</p>
          <h2 className={styles.company}>Company: {user.company.name}</h2>
          <h2 className={styles.website}>Website: {user.website}</h2>
          <Link href={`/users/${user.id}`} className={styles.btn}>View User</Link>
        </div>
      ))


  return (
    <div className="user py-5">
      <div className="content max-w-screen-xl mx-auto">
        <h2 className={styles.title}>Users</h2>
        {showUsers}
      </div>
    </div>
  )
}
export default Users;