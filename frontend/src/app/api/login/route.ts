import userApiRequest from "@/utils/userApiRequest";
import { NextRequest, NextResponse } from "next/server";

// login
export async function POST(req: NextRequest) {
  
  
  try{
    const requestBody = await req.json()
    const response = await userApiRequest("auth/login", "POST", requestBody);
    if(!response.ok){
      throw new Error('Error connecting client - client server')
    }
    const responseData = await response.json()
    return NextResponse.json(JSON.stringify(responseData),{
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    }
    catch(err) {
    console.error(err)
  }
}
