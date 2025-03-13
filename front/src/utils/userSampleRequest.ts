import { User1 } from "./sample";
import { NextResponse } from "next/server";

export default async function userSampleRequest(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  token?: string,
) {
  return NextResponse.json(User1, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
