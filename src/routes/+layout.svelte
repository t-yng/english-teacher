<script>
  import '$lib/styles/global.css';
  import Button from '$lib/components/Button';
</script>

<header class="header">
  <a href="/">
    <Button noop={true} variant="outline">＋新しい添削</Button>
  </a>
</header>
<slot />

<style>
  .header {
    height: 64px;
    border-bottom: 1px solid #d9d9e3;
    padding: 16px 32px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>
