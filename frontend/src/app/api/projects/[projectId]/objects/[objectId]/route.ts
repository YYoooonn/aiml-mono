import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "@/app/_actions/auth";
import { userAuthRequest } from "@/utils/userApiRequest";
// import userSampleRequest from "@/utils/userSampleRequest";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { projectId: string; objectId: string } },
) {
  try {
    const token = await getCookie();
    const response = await userAuthRequest(
      `projects/${params.projectId}/objects/${params.objectId}`,
      "GET",
      token,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      console.debug("GET object response", res);
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }

    const responseData = await response.json();
    console.debug("GET object response", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { projectId: string; objectId: string } },
) {
  try {
    const token = await getCookie();
    const requestBody = await req.json();
    const response = await userAuthRequest(
      `projects/${params.projectId}/objects/${params.objectId}`,
      "PUT",
      token,
      requestBody,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      console.debug("PUT OBJECT RESPONSE FROM BACK :", res);
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }
    const responseData = await response.json();
    console.debug("PUT OBJECT RESPONSE FROM BACK :", responseData);
    //console.debug("response data from creating projects", responseData);
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { projectId: string; objectId: string } },
) {
  try {
    console.log("DELETE CALL FROM ROUTE");
    const token = await getCookie();
    // const requestBody = await req.json()
    const response = await userAuthRequest(
      `projects/${params.projectId}/objects/${params.objectId}`,
      "DELETE",
      token,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      console.debug("DELETE OBJECT RESPONSE FROM BACK :", res);
      return NextResponse.json(
        { error: res },
        {
          status: 200,
          headers: ApiResponseHeader,
        },
      );
    }
    return NextResponse.json({
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
  }
}
