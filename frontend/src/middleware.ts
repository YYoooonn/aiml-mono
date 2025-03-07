import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/login"],
  // matcher: ["/login", "/workspace/:path*"]
};

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/login" && request.cookies.get("aimljwt")) {
    console.log("middleware", request.cookies.get("aimljwt"))
    return NextResponse.rewrite(new URL("/user", request.url));
  }
  return NextResponse.next();
}
