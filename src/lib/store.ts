import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "devices.json");

// Function to read devices from the JSON file
function readDevices(): { name: string; allowance: boolean }[] {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return []; // Return empty array if file does not exist or fails to read
  }
}

// Function to write devices to the JSON file
function writeDevices(devices: { name: string; allowance: boolean }[]) {
  fs.writeFileSync(filePath, JSON.stringify(devices, null, 2));
}

// Get all devices
export function getDevices() {
  return readDevices();
}

// Disable all devices
export function disableAllDevices() {
  const devices = readDevices();
  devices.forEach(device => (device.allowance = false));
  writeDevices(devices);
  return devices;
}

// Enable all devices
export function enableAllDevices() {
  const devices = readDevices();
  devices.forEach(device => (device.allowance = true));
  writeDevices(devices);
  return devices;
}

// Add or update a device
export function addDevice(device: { name: string; allowance?: boolean }) {
  let devices = readDevices();
  const existingDevice = devices.find(d => d.name === device.name);

  if (existingDevice) {
    if (device.allowance !== undefined) {
      existingDevice.allowance = device.allowance;
    }
  } else {
    devices.push({ name: device.name, allowance: device.allowance ?? true });
  }

  writeDevices(devices);
  return devices;
}

// ✅ Toggle a device's allowance
export function toggleDevice(name: string) {
  let devices = readDevices();
  const device = devices.find(d => d.name === name);

  if (device) {
    device.allowance = !device.allowance; // Toggle allowance
    writeDevices(devices);
  }

  return devices;
}
