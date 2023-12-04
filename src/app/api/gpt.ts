import { OpenAI } from "openai";

const CHAT_GPT_MODEL = "gpt-4-1106-preview";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const systemPrompt = `あなたは英語の先生です。
以下の指示に従って英語の文章を添削してください。
結果はデータモデルに従ったJSON形式で出力してください。

## 指示
・各英文の誤りを指摘して修正してください。
・なぜ間違っているかの理由を日本語で説明してください。
・修正した文章の全体を日本語に翻訳してください。

## データモデル
"""
{
  "revisedSentences": [
    {
      "originalSentence": "<修正前のテキスト>",
      "revisedSentence": "<修正後のテキスト>",
      "explanation": "<修正の理由>"
    }
  ],
  "revisedFullText": "<修正後の全文>",
  "revisedFullTextInJapanese": "<修正後の全文の日本語訳>",
  "isPerfect": "<修正前の文章は変更箇所が存在しないか>"
}
"""
`;

const correctEnglishByChatGpt = async (englishText: string) => {
  const result = await openai.chat.completions.create({
    // 添削の度に結果が変わると分かりづらくなるので、同じ添削結果を返すようにtemperatureを0に設定
    temperature: 0,
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
    response_format: {
      type: "json_object",
    },
  });

  if (
    result.choices.length === 0 ||
    result.choices[0].message.content == null
  ) {
    throw new Error("英語の添削に失敗しました");
  }

  return JSON.parse(result.choices[0].message.content);
};

export const correctEnglishText = (englishText: string) => {
  return correctEnglishByChatGpt(englishText);
};

export const askQuestion = async (
  messages: string[],
  onStreamChunk: (message: string) => void,
  onStreamEnd: () => void,
  onError: (error: Error) => void
) => {
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

  const stream = await openai.chat.completions.create({
    messages: postMessages,
    model: CHAT_GPT_MODEL,
    stream: true,
  });

  try {
    for await (const chunk of stream) {
      const content = chunk.choices[0].delta.content;
      if (content !== "") {
        onStreamChunk(content ?? "");
      }
    }

    onStreamEnd();
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      onError(e);
    } else {
      onError(new Error("質問の回答中に予期しないエラーが発生しました"));
    }
  }
};
