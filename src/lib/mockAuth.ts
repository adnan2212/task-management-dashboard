import { NextResponse } from "next/server";
import { MOCK_TOKEN } from "./mockDb";

// Returns a 401 response if the token is missing/wrong, otherwise null.
export function requireAuth(req: Request): NextResponse | null {
  const header = req.headers.get("authorization");
  if (header !== `Bearer ${MOCK_TOKEN}`) {
    return NextResponse.json({ message: "Session expired. Log in again." }, { status: 401 });
  }
  return null;
}