import { getCookie } from "@/app/_actions/auth";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import userAuthRequest from "@/utils/userAuthRequest";

export const dynamic = "force-dynamic";

// GET USER PROFILE
export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const token = await getCookie();
    const response = await userAuthRequest(
      `users/${request["username"]}/profile`,
      "GET",
      token,
    );
    console.debug(response);
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      //console.debug(res);
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }
    const responseData = await response.json();
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    //console.debug(err);
  }
}
