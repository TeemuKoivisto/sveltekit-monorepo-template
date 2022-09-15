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
    @apply flex items-center relative border border-gray-400 rounded bg-gray-100 w-72 focus-within:ring focus-within:ring-blue-200;
  }
  :global([slot='input']) {
    @apply w-full p-1 bg-transparent rounded outline-none;
  }
</style>
