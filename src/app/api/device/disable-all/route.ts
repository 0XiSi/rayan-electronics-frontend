import { NextResponse } from "next/server";
import { disableAllDevices } from "@/lib/store";

export async function POST() {
  return NextResponse.json({ devices: disableAllDevices() });
}
