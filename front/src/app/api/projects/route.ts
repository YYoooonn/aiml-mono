import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/auth";
import { userAuthRequest } from "@/utils/userApiRequest";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

// XXX GET PROJECTS - 필요한가?
// export async function GET() {}

// POST Project
export async function POST(req: NextRequest) {
  try {
    const token = await getCookie();

    // 401 error , token not valid - redirect login
    if (!token) {
      return NextResponse.json(
        { error: "token not valid, please login again" },
        {
          status: 401,
          headers: ApiResponseHeader,
        },
      );
    }

    const requestBody = await req.json();
    const response = await userAuthRequest(
      "projects",
      "POST",
      token,
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
    //console.debug("response data from creating projects", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    //console.debug(err);
  }
}
