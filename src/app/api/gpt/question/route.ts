import { NextResponse } from "next/server";
import { askQuestion } from "@/app/api/gpt";

export async function POST(request: Request) {
  const body = await request.json();
  const answer = await askQuestion(body.messages);
  return NextResponse.json({ answer });
}
