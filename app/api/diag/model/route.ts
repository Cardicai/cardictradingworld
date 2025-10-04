import { NextResponse } from "next/server";

const MODEL = process.env.MODEL || "gpt-5";

export async function GET() {
  return NextResponse.json({ model: MODEL });
}
