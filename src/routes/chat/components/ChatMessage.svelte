<script lang="ts">
  import Button from '$lib/components/Button';
  import { type Message, isChatMessage, isCorrectionMessage } from '../type';
  import CorrectionMessageBody from './CorrectionMessageBody.svelte';

  export let message: Message;
  export let error: boolean = false;
  export let onClickReAskQuestion: () => void;
</script>

<div
  class="messageBox"
  class:userMessageBox={message.owner === 'user'}
  class:aiMessageBox={message.owner === 'ai'}
>
  <div class="message">
    {#if isChatMessage(message)}
      {message.text}
    {:else if isCorrectionMessage(message)}
      <CorrectionMessageBody correctionResult={message.correctedResult} />
    {/if}
    {#if error}
      <!-- TODO: エラーメッセージとボタンのデザインを修正 -->
      <div>
        <span class="error">エラーが発生しました</span>
        <Button on:click={onClickReAskQuestion}>回答を再生成</Button>
      </div>
    {/if}
  </div>
</div>

<style>
  .messageBox {
    padding: 24px 16px;
    color: #666;
  }

  .message {
    max-width: 700px;
    margin: 0 auto;
    white-space: pre-line;
  }

  .userMessageBox {
    background-color: #f7f7f8;
  }

  .aiMessageBox {
    background-color: #fff;
  }

  .error {
    color: red;
  }
</style>
