<script lang="ts">
</script>

<span data-component="button">
  <button
    on:click
    on:mouseover
    on:mouseenter
    on:mouseleave
    on:focus
    class={`${$$props.class || ''}`}
    {...$$restProps}><slot /></button
  >
</span>

<style lang="scss">
  /* This shenanigan is for allowing Tailwind classes to override these styles */
  :global(:where([data-component='button']) button) {
    @apply text-black text-sm uppercase font-sans cursor-pointer rounded border border-transparent py-2 px-4;
  }
</style>
