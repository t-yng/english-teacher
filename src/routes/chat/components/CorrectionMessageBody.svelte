<script lang="ts">
  import type { CorrectEnglishResult } from '$lib/gpt/type';
  import { diffWordsInSentence } from './diff';

  export let correctionResult: CorrectEnglishResult;
</script>

<div>
  <p># 修正案</p>
  <p>{correctionResult.revisedFullText}</p>
</div>
<br />
<div>
  <p># 修正案（日本語）</p>
  <p>{correctionResult.revisedFullTextInJapanese}</p>
</div>
<br />
{#if correctionResult.revisedSentences.length === 0}
  <div>
    <p># 添削結果</p>
    <p>英文は完璧です🎉</p>
  </div>
{:else}
  {#each correctionResult.revisedSentences as revision, i (i)}
    {@const { originalSentenceBlocks, revisedSentenceBlocks } =
      diffWordsInSentence(revision.originalSentence, revision.revisedSentence)}
    <p># 添削結果{i + 1}</p>
    <p>
      原文:{' '}
      {#each originalSentenceBlocks as block, i (i)}
        <span class:removedBlock={block.removed}>
          {block.value}
        </span>
      {/each}
    </p>
    <p>
      修正文:{' '}
      {#each revisedSentenceBlocks as block, i (i)}
        <span class:addedBlock={block.added}>
          {block.value}
        </span>
      {/each}
    </p>
    <p>説明: {revision.explanation}</p>
    <br />
  {/each}
{/if}

<style>
  .removedBlock {
    color: red;
    text-decoration: line-through;
  }

  .addedBlock {
    color: green;
  }
</style>
