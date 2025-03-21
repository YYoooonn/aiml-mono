import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/auth";
import { userAuthRequest } from "@/utils/userApiRequest";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

// GET PROJECT
export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {
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
    const response = await userAuthRequest(
      `projects/${params.projectId}`,
      "GET",
      token,
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

// DELETE PROJECT :: TODO
export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {}

// TODO - authentication
export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string } },
) {}
