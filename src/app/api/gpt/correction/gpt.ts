import { ChatOpenAI } from "langchain/chat_models/openai";
import { createExtractionChainFromZod } from "langchain/chains";
import { z } from "zod";

const chatModel = new ChatOpenAI({
  modelName: "gpt-4-0613",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const createChainByZodSchema = () => {
  const zodSchema = z.object({
    revisedSentences: z.array(
      z.object({
        originalSentence: z.string(),
        revisedSentence: z.string(),
        revisedReason: z.string(),
      })
    ),
    revisedFullText: z.string(),
  });

  return createExtractionChainFromZod(zodSchema, chatModel);
};

const chain = createChainByZodSchema();

const createCorrectingEnglishPrompt = (englishText: string) => {
  // WARNING: プロンプトの内容次第でFunctionCallがされなくなるので、内容の修正は要注意
  return `あなたは英語の先生です。
  与えられた英語の文章の誤りを指摘して修正してください。
  また何故誤っているかの理由を日本語で説明してください。

  ## 英語の文章
  ${englishText}
`;
};

export const correctEnglishText = (englishText: string) => {
  const prompt = createCorrectingEnglishPrompt(englishText);
  return chain.run(prompt);
};
