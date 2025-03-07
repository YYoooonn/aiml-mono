import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/auth";
import { userApiRequest, userAuthRequest } from "@/utils/userApiRequest";
import { error } from "console";
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
    const response = token
      ? await userAuthRequest(`projects/${params.projectId}`, "GET", token)
      : await userApiRequest(`projects/${params.projectId}`, "GET");

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json(responseData, {
        status: 200,
        headers: ApiResponseHeader,
      });
    } else {
      const err = await response.text();
      throw error(err);
    }
  } catch (err) {
    return NextResponse.json(
      { error: err },
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
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
