import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Get all devices
export async function getDevices() {
  const { data, error } = await supabase.from("devices").select("*");
  console.log(data)
  if (error) throw error;
  return data;
}

// Disable all devices
export async function disableAllDevices() {
  const { data, error } = await supabase
    .from("devices")
    .update({ allowance: false })
    .neq("id", 0);
  if (error) throw error;
  return data;
}

// Enable all devices
export async function enableAllDevices() {
  const { data, error } = await supabase
    .from("devices")
    .update({ allowance: true })
    .neq("id", 0);
  if (error) throw error;
  return data;
}

export async function addDevice(device: { name: string; allowance?: boolean }) {
  const { data, error } = await supabase
    .from("devices")
    .upsert([{ name: device.name, allowance: device.allowance ?? true }], {
      onConflict: "name",
    })
    .select(); // ✅ Ensure data is returned

  if (error) throw error;
  return data;
}


// Toggle a device's allowance
export async function toggleDevice(name: string) {
  const { data: device, error } = await supabase
    .from("devices")
    .select("allowance")
    .eq("name", name)
    .single();

  if (error || !device) throw new Error("Device not found");

  const newAllowance = !device.allowance;
  const { data, error: updateError } = await supabase
    .from("devices")
    .update({ allowance: newAllowance })
    .eq("name", name)
    .select();

  if (updateError) throw updateError;
  return data;
}

// import fs from "fs";
// import path from "path";
//
// const filePath = path.join(process.cwd(), "devices.json");
//
// // Function to read devices from the JSON file
// function readDevices(): { name: string; allowance: boolean }[] {
//   try {
//     const data = fs.readFileSync(filePath, "utf-8");
//     return JSON.parse(data);
//   } catch (error) {
//     return []; // Return empty array if file does not exist or fails to read
//   }
// }
//
// // Function to write devices to the JSON file
// function writeDevices(devices: { name: string; allowance: boolean }[]) {
//   fs.writeFileSync(filePath, JSON.stringify(devices, null, 2));
// }
//
// // Get all devices
// export function getDevices() {
//   return readDevices();
// }
//
// // Disable all devices
// export function disableAllDevices() {
//   const devices = readDevices();
//   devices.forEach(device => (device.allowance = false));
//   writeDevices(devices);
//   return devices;
// }
//
// // Enable all devices
// export function enableAllDevices() {
//   const devices = readDevices();
//   devices.forEach(device => (device.allowance = true));
//   writeDevices(devices);
//   return devices;
// }
//
// // Add or update a device
// export function addDevice(device: { name: string; allowance?: boolean }) {
//   let devices = readDevices();
//   const existingDevice = devices.find(d => d.name === device.name);
//
//   if (existingDevice) {
//     if (device.allowance !== undefined) {
//       existingDevice.allowance = device.allowance;
//     }
//   } else {
//     devices.push({ name: device.name, allowance: device.allowance ?? true });
//   }
//
//   writeDevices(devices);
//   return devices;
// }
//
// // ✅ Toggle a device's allowance
// export function toggleDevice(name: string) {
//   let devices = readDevices();
//   const device = devices.find(d => d.name === name);
//
//   if (device) {
//     device.allowance = !device.allowance; // Toggle allowance
//     writeDevices(devices);
//   }
//
//   return devices;
// }
