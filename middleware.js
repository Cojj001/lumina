import { NextResponse } from "next/server";
import { auth } from "./lib/firebase";

export async function middleware(req) {
  const user = auth.currentUser;

  if (!user && req.nextUrl.pathname.startsWith("/profile")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
