import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
// import { getCookie } from "@/app/_actions/auth";
// import userAuthRequest from "@/utils/userAuthRequest";
import { userApiRequest } from "@/utils/userApiRequest";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

// POST object
export async function POST(req: NextRequest) {
  try {
    // XXX should validate token chek
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

    const requestBody = await req.json();
    //console.debug(requestBody["objectInfo"]);
    // without token
    const response = await userApiRequest(
      `projects/${requestBody["projectId"]}/objects`,
      "POST",
      requestBody["objectInfo"],
    );
    console.debug(response);
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
    //console.debug(responseData);
    //console.debug("response data from creating projects", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    //console.debug(err);
  }
}
