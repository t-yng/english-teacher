import { askQuestion } from "@/app/api/gpt";

export async function POST(req: Request) {
  const body = await req.json();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  askQuestion(
    body.messages,
    (message) => {
      writer.write(`data: ${message}\n\n`);
    },
    () => writer.close()
  );

  return new Response(responseStream.readable, {
    headers: {
      "Content-Type": "text/event-stream",
      Connection: "keep-alive",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}
