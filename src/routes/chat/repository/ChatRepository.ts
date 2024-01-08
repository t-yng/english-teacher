import type { CorrectEnglishResult } from '$lib/gpt/type';

export class ChatRepository {
  private readonly chatMessages: string[];

  constructor(chatMessages: string[] = []) {
    this.chatMessages = chatMessages;
  }

  public async correctEnglishText(text: string): Promise<CorrectEnglishResult> {
    const res = await fetch('/api/chat/correction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text })
    });
    return await res.json();
  }

  public async askQuestion(
    question: string,
    onRead: (answer: string) => void,
    onError: (error: Error) => void
  ): Promise<void> {
    const messages = [...this.chatMessages, question];

    const res = await fetch('/api/chat/question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });

    this.handleAnswerStreamResponse(res, onRead, onError);
  }

  private handleAnswerStreamResponse(
    res: Response,
    onRead: (answer: string) => void,
    onError: (error: Error) => void
  ) {
    // ストリームのリーダーを取得
    // TextDecoderStreamを通して、Uint8Arrayを文字列に変換する
    const reader = res.body?.pipeThrough(new TextDecoderStream()).getReader();
    if (!reader) return;

    let answer = '';

    // リーダーからデータを読み込む
    // REFACTOR: 処理用のクラスを別途作成する
    const read = async ({ firstRead }: { firstRead: boolean }) => {
      // TODO: net:ERR_HTTP2_PROTOCOL_ERROR が発生場合があるので、例外処理をしてリトライ可能にする
      try {
        const { done, value } = await reader.read();
        if (done) {
          reader.releaseLock();
          return;
        }
        // 読み込んだイベントデータから、dataとeventを抽出する
        const result = value.split(/\n\n/).reduce(
          (acc, message) => {
            if (message.startsWith('data: ') && message !== 'data: [DONE]') {
              // data: test1\ndata:test2 と複数行のデータが送られてくる場合を考慮
              acc['data'] += message
                .split('\n')
                .filter((line) => line !== 'data: [DONE]')
                .map((line) => line.replace('data: ', ''))
                .join('\n');
              return acc;
            } else if (message.startsWith('event: ')) {
              acc['event'] = message.replace('event: ', '');
              return acc;
            }

            return acc;
          },
          { data: '', event: null } as { data: string; event: string | null }
        );

        // 回答を逐次更新して表示
        answer = firstRead ? result.data : answer + result.data;
        onRead(answer);

        read({ firstRead: false });
      } catch (e) {
        // TODO: 例外処理
        console.error(`質問に対する回答の取得中にエラーが発生しました: ${e}`);
        onError(e as Error);
      }
    };

    read({ firstRead: true });
  }
}
