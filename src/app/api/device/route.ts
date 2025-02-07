import { NextResponse } from "next/server";
import { getDevices, addDevice } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ devices: getDevices() });
}

export async function POST(req: Request) {
  const body = await req.json();
  const devices = addDevice({ name: body.name, allowance: body.allowance });
  return NextResponse.json({ devices });
}
