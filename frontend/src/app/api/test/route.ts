import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const body = await request.json()
  try {
    const res = await axios.get("http://13.124.220.49:8080/api/test");
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("server error", { status: 500 });
  }
}

// export async function test<Result>(
//   body?: object,
// ) {
//   return await fetch(`http://naver.com`, {
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         "Content-Type": `application/json`,
//       },
//     method: "GET",
//     ...(body && {
//       body: JSON.stringify(body),
//     }),
//   }).then<Result>((res) => res.json()).catch((err) => {console.log(err)});
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//     const testResponse = await test()

//     res.revalidate("/");
//     res.status(200).json(testResponse)
// }
