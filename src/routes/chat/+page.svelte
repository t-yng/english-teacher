<script lang="ts">
  import { onMount } from 'svelte';
  import type { ActionData } from './$types';
  import MessageList from './components/MessageList.svelte';
  import type { Message } from './type';
  import type { CorrectEnglishResult } from '$lib/gpt/type';
  import { ChatRepository } from './repository/ChatRepository';
  import ChatBox from './components/ChatBox.svelte';

  export let form: ActionData;
  let messages: Message[] = [
    {
      text: form?.text ?? '',
      owner: 'user',
      type: 'chat'
    },
    {
      text: '添削中...',
      owner: 'ai',
      type: 'chat'
    }
  ];
  let askQuestionError: boolean = false;

  const createCorrectionText = (result: CorrectEnglishResult): string => {
    return [
      `# 修正案\n${result.revisedFullText}`,
      `# 修正案（日本語）\n${result.revisedFullTextInJapanese}`,
      result.revisedSentences.length === 0 && '# 添削結果\n英文は完璧です🎉',
      ...result.revisedSentences.map((revision, i) => {
        return `# 添削結果${i + 1}\n原文: ${
          revision.originalSentence
        }\n修正文: ${revision.revisedSentence}`;
      })
    ].join('\n');
  };

  const reAskQuestion = () => {
    console.log('reAskQuestion');
    askQuestionError = false;
    const question = messages[messages.length - 2].text;
    messages = messages.slice(0, messages.length - 2);
    askQuestion(question);
  };

  const askQuestion = async (question: string) => {
    // メッセージの一覧を更新する
    messages = [
      ...messages,
      {
        text: question,
        owner: 'user',
        type: 'chat'
      },
      {
        text: '考え中...',
        owner: 'ai',
        type: 'chat'
      }
    ];

    // 質問の前のメッセージの一覧を設定する
    const chatRepository = new ChatRepository(
      messages.slice(0, messages.length - 2).map((m) => m.text)
    );
    chatRepository.askQuestion(
      question,
      (answer: string) => {
        messages = messages.with(-1, {
          text: answer,
          owner: 'ai',
          type: 'chat'
        });
      },
      () => {
        askQuestionError = true;
      }
    );
  };

  onMount(async () => {
    if (form != null) {
      const chatRepository = new ChatRepository();
      const result = await chatRepository.correctEnglishText(form.text);
      messages = [
        messages[0],
        {
          text: createCorrectionText(result),
          correctedResult: result,
          owner: 'ai',
          type: 'correction'
        }
      ];
    }
  });
</script>

<main>
  <MessageList
    {messages}
    {askQuestionError}
    onClickReAskQuestion={reAskQuestion}
  />
  <div class="chatBoxContainer">
    <ChatBox onSubmit={askQuestion} />
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: calc(100dvh - 64px);
  }

  .chatBoxContainer {
    display: flex;
    width: 100%;
    justify-content: center;
    padding: 0 1rem 1rem 1rem;
    background-image: linear-gradient(
      180deg,
      hsla(0, 0%, 100%, 0) 13.94%,
      #fff 54.73%
    );
    background-color: #fefefe50;
  }
</style>
