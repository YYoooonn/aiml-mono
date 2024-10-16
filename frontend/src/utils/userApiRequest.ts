import { NextResponse } from "next/server";

// import { UserInfo } from "@/@types/api";
// import isJson from "./isJson";

export default async function userApiRequest<NextResponse>(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  body?: object,
) {
  try {
    const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`Response error from backend status ${response.status}`);
    }
    const responseData = await response.json();

    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error sending data:", error);
    return NextResponse.json(
      JSON.stringify({ error: "Failed to send data to external API" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
