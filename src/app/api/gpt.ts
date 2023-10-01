import { OpenAI } from "openai";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";

// const MODEL = "gpt-3.5-turbo-0613";
const CHAT_GPT_MODEL = "gpt-4-0613";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `あなたは英語の先生です。
以下の指示に従って英語の文章を添削してください。

## 指示
・各英文の誤りを指摘して修正してください。
・なぜ間違っているかの理由を日本語で説明してください。
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
    model: CHAT_GPT_MODEL,
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

export const askQuestion = async (messages: string[]) => {
  const postMessages = [
    {
      role: "system" as const,
      content: systemPrompt,
    },
    ...messages.map<{ role: "user" | "assistant"; content: string }>(
      (message, i) => {
        return {
          role: i % 2 === 0 ? "user" : "assistant",
          content: message,
        };
      }
    ),
  ];

  const result = await openai.chat.completions.create({
    messages: postMessages,
    model: CHAT_GPT_MODEL,
  });

  if (result.choices.length === 0) {
    throw new Error("英語の添削に失敗しました");
  }

  return result.choices[0].message.content;
};
