import { NextResponse } from "next/server";
import { correctEnglishText } from "@/app/api/gpt";

export async function POST(request: Request) {
  const res = await request.json();
  const correction = await correctEnglishText(res.text);
  return NextResponse.json({ correction });
}
