import { NextRequest, NextResponse } from "next/server";


export async function middleware(request: NextRequest) {

  const userToken = request.cookies.get("Bearer");
  const token = userToken?.value;

  if (request.nextUrl.pathname === "/api/users/profile/:path*") {
    if (!token) {
      return NextResponse.json({ message: "No Token Provided, Access Denied." }, { status: 401 })
    }
  }
  if (request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

}

export const config = {
  matcher: ["/api/users/profile/:path*", "/login", "/register"]
} 