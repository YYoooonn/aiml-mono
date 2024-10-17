import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  // const body = await request.json()
  try {
    const res = await axios.get("http://13.124.220.49:8080/api/test");
    return NextResponse.json(res.data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("server error", { status: 500 });
  }
}
