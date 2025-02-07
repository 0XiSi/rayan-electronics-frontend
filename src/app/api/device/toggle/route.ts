import { NextResponse } from "next/server";
import { toggleDevice } from "@/lib/store";

export async function POST(req: Request) {
  const { name } = await req.json();
  const devices = toggleDevice(name);
  return NextResponse.json({ devices });
}
