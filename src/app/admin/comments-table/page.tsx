import { Comment } from "@prisma/client";
import { cookies } from "next/headers";
import axios from "axios";
import DeleteCommentBtn from "./DeleteCommentBtn";

// Get All Comments
const getComments = async (token: string) => {
  const response = await axios.get(`http://localhost:3000/api/comments`, {
    headers: {
      Cookie: `Bearer=${token}`
    }
  })
  const data: Comment[] = response.data;
  return data;
}

// Main Function
async function AdminCommentsTable() {
  const token = cookies().get("Bearer")?.value as string;
  const comments: Comment[] = await getComments(token);
  console.log(comments)
  // Show Articles
  const showComments = comments.map((comment, index) => (
    <tr key={comment.id} className="border-t border-slate-950">
      <td className="p-2">{index + 1}</td>
      <td>{comment.text}</td>
      <td>{comment.articleId}</td>
      <td>{new Date(comment.createdAt).toDateString()}</td>
      <td>
        <div className="flex items-center justify-center gap-2">
          <DeleteCommentBtn commentId={comment.id} />
        </div>
      </td>
      <td>
      </td>
    </tr>
  ))



  return (
    <div className="py-5">
      <h3 className="mb-5">Comments Table</h3>
      <table className="w-full bg-[#eee] p-3 text-center mb-5">
        <thead>
          <tr className="border-b border-slate-950 bg-slate-900 text-white">
            <th className="py-2">#</th>
            <th className="py-2">Comment Text</th>
            <th className="py-2">ArticleId</th>
            <th className="py-2">CreatedAt</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {showComments}
        </tbody>
      </table>
    </div>
  )
}
export default AdminCommentsTable;