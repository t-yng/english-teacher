import { EnglishTeacher } from '$lib/gpt/EnglishTeacher';
import { type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();
  const teacher = new EnglishTeacher();

  teacher.answerEnglishQuestion(
    body.messages,
    (message) => {
      // テキストに改行が含まれる場合は、data: を複数行で出力する
      const data = message
        .split('\n')
        .map((line) => `data: ${line}`)
        .join('\n');
      writer.write(`${data}\n\n`);
    },
    () => {
      writer.write(`data: [DONE]\n\n`).then(() => writer.close());
    },
    (e) => writer.abort(e)
  );

  return new Response(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform'
    }
  });
};
