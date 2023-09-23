import { OpenAI } from "openai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `あなたは英語の先生です。
以下の指示に従って英語の文章を日本語で添削してください。

## 指示
・各英文の誤りを指摘して修正してください。
・なぜ間違っているかの理由を説明してください。
・修正した文章の全体を日本語に翻訳してください。
`;

const zodCorrectEnglishSchema = z.object({
  revisedSentences: z
    .array(
      z.object({
        originalSentence: z.string(),
        revisedSentence: z.string(),
        explanation: z.string(),
      })
    )
    .optional(),
  revisedFullText: z.string(),
  revisedFullTextInJapanese: z.string(),
  isPerfect: z.boolean(),
});

const jsonSchema = zodToJsonSchema(
  zodCorrectEnglishSchema,
  "correctEnglishSchema"
);

const correctEnglishByChatGpt = async (englishText: string) => {
  const result = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: englishText,
      },
    ],
    // model: "gpt-3.5-turbo-0613",
    model: "gpt-4-0613",
    function_call: {
      name: "correctEnglish",
    },
    functions: [
      {
        name: "correctEnglish",
        description: "correct english sentences result",
        parameters: jsonSchema.definitions!.correctEnglishSchema,
      },
    ],
  });

  if (
    result.choices.length === 0 ||
    result.choices[0].message.function_call == null
  ) {
    throw new Error("英語の添削に失敗しました");
  }

  return JSON.parse(result.choices[0].message.function_call.arguments);
};

export const correctEnglishText = (englishText: string) => {
  return correctEnglishByChatGpt(englishText);
};
