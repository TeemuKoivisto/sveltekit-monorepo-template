<script lang="ts">
</script>

<span data-component="field">
  <div class={$$props.class} {...$$restProps}>
    <span class="pl-2 pr-1 w-max"><slot name="icon" /></span>
    <slot class="w-full p-1 bg-transparent rounded outline-none" name="input" />
  </div>
</span>

<style lang="scss">
  :global(:where([data-component='field']) div) {
    @apply flex items-center relative rounded bg-zinc-600 focus-within:ring focus-within:ring-blue-200;
  }
  :global([slot='icon'] *) {
    @apply text-gray-900;
  }
  :global([slot='input']) {
    @apply w-full p-1 bg-transparent rounded outline-none;
  }
</style>
