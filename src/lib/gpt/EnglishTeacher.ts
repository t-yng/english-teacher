import { OpenAI } from 'openai';
import { CorrectEnglishPrompt } from './CorrectEnglishPrompt';
import type { CorrectEnglishResult } from './type';
import { OPENAI_API_KEY } from '$env/static/private';
import { AnswerQuestionPrompt } from './AnswerQuestionPrompt';

export class EnglishTeacher {
  private readonly CHAT_GPT_MODEL = 'gpt-4-1106-preview';
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  }

  public async correctEnglishText(text: string): Promise<CorrectEnglishResult> {
    const result = await this.openai.chat.completions.create({
      // 添削の度に結果が変わると分かりづらくなるので、同じ添削結果を返すようにtemperatureを0に設定
      temperature: 0,
      messages: [
        {
          role: 'system',
          content: new CorrectEnglishPrompt().toString()
        },
        {
          role: 'user',
          content: text
        }
      ],
      model: this.CHAT_GPT_MODEL,
      response_format: {
        type: 'json_object'
      }
    });

    if (
      result.choices.length === 0 ||
      result.choices[0].message.content == null
    ) {
      throw new Error('英語の添削に失敗しました');
    }

    return JSON.parse(result.choices[0].message.content);
  }

  public async answerEnglishQuestion(
    messages: string[],
    onStreamChunk: (message: string) => void,
    onStreamEnd: () => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const postMessages = [
      {
        role: 'system' as const,
        content: new AnswerQuestionPrompt().toString()
      },
      ...messages.map<{ role: 'user' | 'assistant'; content: string }>(
        (message, i) => {
          return {
            role: i % 2 === 0 ? 'user' : 'assistant',
            content: message
          };
        }
      )
    ];

    const stream = await this.openai.chat.completions.create({
      messages: postMessages,
      model: this.CHAT_GPT_MODEL,
      stream: true
    });

    try {
      for await (const chunk of stream) {
        const content = chunk.choices[0].delta.content;
        if (content !== '') {
          onStreamChunk(content ?? '');
        }
      }

      onStreamEnd();
    } catch (e) {
      console.error(e);
      if (e instanceof Error) {
        onError(e);
      } else {
        onError(new Error('質問の回答中に予期しないエラーが発生しました'));
      }
    }
  }
}
