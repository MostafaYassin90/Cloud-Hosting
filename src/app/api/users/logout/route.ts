import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/* 
** @Mehtod Get
** @Route http:localhost:3000/api/user/logout
** @Desc Delete User Token To Logout
** @Access Public
*/

export async function GET() {
  try {
    cookies().delete("Bearer")
    return NextResponse.json({ message: "Logout Successfully" }, { status: 200 })
  }
  catch (error) {
    return NextResponse.json(
      { message: `Internal Server ${error}.` },
      { status: 500 })
  };
}
