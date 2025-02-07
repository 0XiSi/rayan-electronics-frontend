import { NextResponse } from "next/server";
import { enableAllDevices } from "@/lib/store";

export async function POST() {
  return NextResponse.json({ devices: enableAllDevices() });
}
