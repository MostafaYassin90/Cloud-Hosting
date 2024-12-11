import axios from "axios";
import styles from "./styles.module.css";
import { TUsers } from "@/dataType";

type TProps = {
  params: { userId: string }
}


// Function Get Single User
async function getSingleUser(id: string) {
  const response = await axios.get(`http://localhost:9000/users/${id}`)
  const data: TUsers = response.data;
  return data;
}

// Function MetaData
export async function generateMetadata(props: TProps) {
  const userId = props.params.userId;
  const user = await getSingleUser(userId)
  return {
    title: user.name,
    description: `User Info: Username: ${user.username} - email: ${user.email}`
  }
}


// Main Function
async function SingleUsers(props: TProps) {
  const userId = props.params.userId;
  const user = await getSingleUser(userId);

  return (
    <div className={styles.singleUser}>
      <div className="max-w-screen-xl mx-auto">
        <h2 className={styles.title}>Single User</h2>
        {/* Start User */}
        <div className={styles.user} key={user.id}>
          <h2 className={styles.name}>UserName: {user.name}</h2>
          <p className={styles.email}>Email: {user.email}</p>
          <p className={styles.address}>Address: Street:{user.address.street} Suite: {user.address.suit}</p>
          <h2 className={styles.company}>Company: {user.company.name}</h2>
          <h2 className={styles.website}>Website: {user.website}</h2>
        </div>
        {/* End User */}
      </div>
    </div>
  )
}
export default SingleUsers;