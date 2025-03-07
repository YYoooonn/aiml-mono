import { deleteCookie, getCookie } from "@/app/_actions/auth";
import { ApiResponseHeader } from "@/utils/headers";
import { NextRequest, NextResponse } from "next/server";
import { userApiRequest, userAuthRequest } from "@/utils/userApiRequest";
import { createCookie } from "@/app/_actions/auth";

export const dynamic = "force-dynamic";

// GET USER PROFILE
export async function GET(req: NextRequest) {
  // if(!req.cookies.has("aimljwt")){
  //   console.log("GET USER ROUTE REQUEST")
  //   return NextResponse.json({
  //     status: 401,
  //     headers: ApiResponseHeader,
  //   })
  // }

  // const res = userAuthRequest("users/profile", "GET", req.cookies.get("aimljwt")?.value)
  // .then((r) => r.ok ? NextResponse.json(r) : )
  // .catch((e) => {
  //   console.debug(e)
  //   return NextResponse.json(e)
  // })

  // return res

  try {
    const response = await userAuthRequest(
      "users/profile",
      "GET",
      req.cookies.get("aimljwt")?.value,
    );
    // console.debug(response);
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json({
        error: res,
        status: 200,
        headers: ApiResponseHeader,
      });
    }
    const responseData = await response.json();
    return NextResponse.json(responseData, {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
    return NextResponse.json(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    console.debug(requestBody);
    const response = await userApiRequest(
      "users/register",
      "POST",
      requestBody,
    );
    console.debug(response);
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json({
        error: res,
        status: 200,
        headers: ApiResponseHeader,
      });
    }
    const responseData = await response.json();
    if (responseData.hasOwnProperty("token")) {
      // TODO
      await createCookie(responseData.token);
    }
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
    return NextResponse.json({ error: "Unprecedented Error" });
  }
}

// XXX ERROR
export async function PUT(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const token = await getCookie();
    const response = await userAuthRequest(
      "users/profile",
      "PUT",
      token,
      requestBody,
    );
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json({
        error: res,
        status: 200,
        headers: ApiResponseHeader,
      });
    }
    const responseData = await response.json();
    console.debug("put", response);
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
    return NextResponse.json({ error: "Unprecedented Error" });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getCookie();
    const response = await userAuthRequest("users/register", "DELETE", token);
    if (!response.ok) {
      // TODO : RestfulAPI - difference in status message
      const res = await response.text();
      return NextResponse.json({
        error: res,
        status: 200,
        headers: ApiResponseHeader,
      });
    }
    const responseData = await response.json();
    await deleteCookie();
    return NextResponse.json(JSON.stringify(responseData), {
      status: 200,
      headers: ApiResponseHeader,
    });
  } catch (err) {
    console.debug(err);
    return NextResponse.json({ error: "Unprecedented Error" });
  }
}
