import { NextResponse } from "next/server";

// import { UserInfo } from "@/@types/api";
// import isJson from "./isJson";

export default async function userApiRequest<NextResponse>(
  endpoint: string,
  method: "GET" | "POST" | "DELETE" | "PATCH" = "GET",
  body?: object,
) {
    try{
      const response = await fetch(`${process.env.BACKEND_API_BASE + endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
      if (!response.ok){
        throw new Error(`Response error from backend status ${response.status}`)
      }
      const responseData = await response.json()

      return NextResponse.json(JSON.stringify(responseData), {
        status: 200, headers: {
          'Content-Type': 'application/json'
        }
      })
    } catch(error){
      console.error('Error sending data:', error)
      return NextResponse.json(JSON.stringify({error: 'Failed to send data to external API'}), {status:500, headers: { 'Content-Type': 'application/json' }})
    }

  // status check from backend
  // console.log("status from backend", res.status);
  // console.log(await res.json())
  // console.log("value from backend", res.json())

  // await res.text().then((txt) => {
  //   if (isJson(txt)) {
  //     return new NextResponse(JSON.stringify(res.json()), { status: 200 });
  //   }
  //   // TODO response가 json 형태가 아닌 경우
  //   console.error(txt);
  //   throw new Error("not a json response", { cause: txt });
  // });
}
