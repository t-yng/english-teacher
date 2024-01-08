<script lang="ts">
  import Button from '$lib/components/Button/Button.svelte';
  import Icon from '@iconify/svelte';
  import type { ChangeEventHandler, EventHandler } from 'svelte/elements';

  export let onSubmit: (text: string) => void;
  let text: string = '';
  let textareaRef: HTMLTextAreaElement | null = null;
  let formRef: HTMLFormElement | null = null;

  const autoResize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 4 + 'px';
  };

  const resetSize = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
  };

  const handleSubmit: EventHandler<SubmitEvent> = (e) => {
    e.preventDefault();
    onSubmit(text);
    text = '';

    if (textareaRef != null) {
      resetSize(textareaRef);
    }
  };

  const handleChangeText: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    autoResize(e.currentTarget);
  };

  const handleKeyDown: EventHandler<KeyboardEvent> = (e) => {
    // cmd + enter を押したときにフォームの送信を実行する
    if (e.key === 'Enter' && e.metaKey) {
      formRef?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };
</script>

<form class="form" on:submit={handleSubmit} bind:this={formRef}>
  <textarea
    rows={1}
    placeholder="質問する"
    class="chatBox"
    bind:value={text}
    on:input={handleChangeText}
    on:keydown={handleKeyDown}
    bind:this={textareaRef}
  />
  <Button type="submit" class="submitButton">
    <Icon icon="ion:send" />
  </Button>
</form>

<style>
  .form {
    display: flex;
    width: 100%;
    max-width: 700px;
    box-shadow:
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 15px 0px;
    border-radius: 6px;
    position: relative;
  }

  .chatBox {
    width: 100%;
    padding: 14px;
    padding-right: 48px;
    border: 1px solid #d9d9e3;
    border-radius: 6px;
    background-color: white;
    font-size: 16px;
    resize: none;
    max-height: 200px;
  }

  .form :global(.submitButton) {
    font-size: 14px;
    position: absolute;
    right: 12px;
    bottom: 12px;
  }
</style>
