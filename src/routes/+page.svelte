<script lang="ts">
  import Button from '$lib/components/Button';
</script>

<main class="main">
  <form method="POST" action="/chat">
    <textarea rows="7" name="text" />
    <Button class="button">添削</Button>
  </form>
</main>

<style>
  .main {
    margin: 0 auto;
    padding: 3rem 1rem 0;
  }

  textarea {
    width: 100%;
    padding: 8px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    margin: 0 auto;
    gap: 16px;
  }

  form :global(.button) {
    flex-basis: fit-content;
  }
</style>
