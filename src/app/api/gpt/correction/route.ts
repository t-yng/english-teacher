import { NextResponse } from "next/server";
import { correctEnglishText } from "@/app/api/gpt";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const correction = await correctEnglishText(body.text);
    return NextResponse.json({ correction });
  } catch (error) {
    console.error(error);
    return new Response("英語の添削中にエラーが発生しました", {
      status: 500,
    });
  }
}
