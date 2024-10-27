import { getCookie } from "@/app/_actions/auth";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import userAuthRequest from "@/utils/userAuthRequest";

export const dynamic = "force-dynamic";

// GET USER PROFILE
export async function GET(req: NextRequest) {
  try {
    const token = await getCookie();
    const response = await userAuthRequest("users/profile", "GET", token);
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
    console.log("received data", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.error(err);
  }
}
