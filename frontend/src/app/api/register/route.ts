import { ApiResponseHeader } from "@/utils/headers";
import { userApiRequest } from "@/utils/userApiRequest";
import { NextRequest, NextResponse } from "next/server";
import { createCookie } from "@/app/_actions/auth";

// login
export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const response = await userApiRequest(
      "users/register",
      "POST",
      requestBody,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }
    const responseData = await response.json();
    if (responseData.hasOwnProperty("token")) {
      // TODO
      await createCookie(responseData.token);
    }
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.error(err);
  }
}
