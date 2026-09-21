import { NextResponse } from "next/server";
import { MOCK_TOKEN } from "@/lib/mockDb";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (body?.email === "admin@company.com" && body?.password === "password123") {
    return NextResponse.json({
      token: MOCK_TOKEN,
      user: { name: "Admin", email: body.email },
    });
  }
  return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
}