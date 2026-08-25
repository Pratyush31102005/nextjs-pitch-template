import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

const DATA_FILE = join(process.cwd(), "data", "waitlist.json");

async function readWaitlist(): Promise<string[]> {
  try {
    const raw = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const list = await readWaitlist();

    if (list.includes(email.toLowerCase())) {
      return NextResponse.json({ error: "Email already on waitlist" }, { status: 409 });
    }

    list.push(email.toLowerCase());
    await writeFile(DATA_FILE, JSON.stringify(list, null, 2));

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
