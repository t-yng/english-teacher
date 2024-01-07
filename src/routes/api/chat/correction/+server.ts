import { EnglishTeacher } from '$lib/gpt/EnglishTeacher';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.json();
  const teacher = new EnglishTeacher();
  const result = await teacher.correctEnglishText(body.text);

  return json(result);
};
