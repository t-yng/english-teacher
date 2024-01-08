<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements';

  interface $$Props extends HTMLButtonAttributes {
    variant?: Variant;
    noop?: boolean;
  }

  type Variant = 'primary' | 'outline';
  export let variant: Variant = 'primary';
  export let noop: boolean = false;

  const { class: className, ...others } = $$restProps;
</script>

<svelte:element
  this={noop ? 'span' : 'button'}
  class={['button', className].join(' ')}
  class:outline={variant === 'outline'}
  class:primary={variant === 'primary'}
  on:click
  role={noop ? undefined : 'button'}
  {...others}
>
  <slot />
</svelte:element>

<style>
  .button {
    appearance: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    padding: 8px;
    cursor: pointer;
  }

  .primary {
    color: #fff;
    background-color: #4d8cff;
  }

  .primary:hover {
    filter: brightness(1.1);
  }

  .outline {
    background-color: #fff;
    color: #666;
    border: 1px solid #d9d9e3;
  }

  .outline:hover {
    filter: brightness(0.95);
  }
</style>
