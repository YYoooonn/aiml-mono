import { ApiResponseHeader } from "@/utils/headers";
import userApiRequest from "@/utils/userApiRequest";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.error(err);
  }
}
