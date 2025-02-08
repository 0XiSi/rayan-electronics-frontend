import { NextResponse } from "next/server";
import { getDevices, addDevice } from "@/lib/store";

export async function GET() {
  try {
    const devices = await getDevices(); // ✅ Await the async function
    return NextResponse.json({ devices });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const devices = await addDevice({ name: body.name, allowance: body.allowance }); // ✅ Await the function

    return NextResponse.json({ devices });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}