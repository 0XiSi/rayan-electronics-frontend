"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { vazirMatn } from 'next-persian-fonts/vazirmatn';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {log} from "node:util";

interface Device {
  name: string;
  allowance: boolean;
}

export default function Page() {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    fetchDevices().then(() => {});
  }, []);

  async function fetchDevices() {
    const res = await fetch("/api/device");
    const data = await res.json();
    setDevices(data.devices);
  }

  async function toggleDevice(name: string) {
    console.log(JSON.stringify({ name }))
    await fetch("/api/device/toggle", {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: { "Content-Type": "application/json" },
    });
    await fetchDevices(); // Refresh list after toggle
  }

  async function handleDisableAllDevices() {
    await fetch("/api/device/disable-all", { method: "POST" });
    await fetchDevices();
  }

  async function handleEnableAllDevices() {
    await fetch("/api/device/enable-all", { method: "POST" });
    await fetchDevices();
  }

  return (
    <div className="overflow-x-hidden">
      <main className={`${vazirMatn.className} mb-auto bg-slate-50 flex flex-col items-center`}>
        <div className="h-[81vh] flex flex-col items-center">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">اسم تابلو</TableHead>
                <TableHead>وضعیت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {devices.map((device, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>اجازه{device.allowance ? " دارد" : " ندارد"}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => toggleDevice(device.name)}
                      className={buttonVariants({ size: 'sm' })}
                    >
                      {device.allowance ? "Block" : "Allow"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button
            onClick={handleDisableAllDevices}
            className={buttonVariants({ variant: "destructive", className: "bg-red-300 text-black mt-10" })}
          >
            قطع کردن همه تابلو ها
          </Button>
          <Button onClick={handleEnableAllDevices} className="mt-2 bg-green-300 text-black">
            وصل کردن همه تابلو ها
          </Button>
        </div>
      </main>
    </div>
  );
}
