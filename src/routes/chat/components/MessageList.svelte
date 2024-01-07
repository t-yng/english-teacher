<script lang="ts">
  import { afterUpdate } from 'svelte';
  import { type Message } from '../type';
  import ChatMessage from './ChatMessage.svelte';

  export let messages: Message[] = [];
  export let askQuestionError: boolean = false;
  export let onClickReAskQuestion: () => void;

  let messageList: HTMLUListElement | null = null;

  // メッセージが更新された時にメッセージに合わせて自動でスクロールする
  // TODO: ユーザーがスクロールしている場合考慮して、位置が最下部に存在する場合のみ自動スクロールするようにする
  afterUpdate(() => {
    if (messageList != null) {
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: 'smooth'
      });
    }
  });
</script>

<ul bind:this={messageList}>
  {#each messages as message, i (i)}
    <li class="messageBox">
      <ChatMessage
        {message}
        error={i === messages.length - 1 && askQuestionError}
        {onClickReAskQuestion}
      />
    </li>
  {/each}
</ul>

<style>
  ul {
    list-style: none;
    overflow: auto;
    padding-bottom: 32px;
    height: 100%;
  }

  .messageBox {
    border-bottom: 1px solid #d9d9e3;
  }
</style>
