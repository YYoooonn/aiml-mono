import { NextResponse } from "next/server";

interface RegisterResponse extends NextResponse {
  // encoded password response
  body: { password: string };
}

interface LoginResponse {
  // jwt token
  body: { token: string };
}

interface UserInfo {
  username: string;
  password: string;
}
