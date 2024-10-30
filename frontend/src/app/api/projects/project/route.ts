import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import userAuthRequest from "@/utils/userAuthRequest";
// import { getCookie } from "@/app/_actions/auth";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

// GET Project
export async function POST(req: NextRequest) {
  try {
    // FIXME add token later
    // const token = await getCookie();
    // // 401 error , token not valid - redirect login
    // if (!token) {
    //   return NextResponse.json(
    //     { error: "token not valid, please login again" },
    //     {
    //       status: 401,
    //       headers: ApiResponseHeader,
    //     },
    //   );
    // }

    // TODO unpack username
    const requestBody = await req.json();
    //console.debug(requestBody);

    const response = await userAuthRequest(
      `projects/${requestBody["projectId"]}`,
      "GET",
    );
    //console.debug(response);
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
    //console.debug("response data from fetching projects", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    //console.debug(err);
  }
}
