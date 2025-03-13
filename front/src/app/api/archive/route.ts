import { ApiResponseHeader } from "@/utils/headers";
import { userApiRequest } from "@/utils/userApiRequest";
import { NextRequest, NextResponse } from "next/server";

// GET ARCHIVES
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await userApiRequest(
      `projects/search?keyword=${body.keyword}&pageNumber=${body.pageNumber}&pageSize=${body.pageSize}`,
      "GET",
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
    // console.log("ARCHIVE response");
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      JSON.stringify({ error: "error while fetching archive" }),
      {
        status: 200,
        headers: ApiResponseHeader,
      },
    );
  }
}
