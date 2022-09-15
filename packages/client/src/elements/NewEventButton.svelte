<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import plus from '@iconify-icons/mdi/plus.js'
</script>

<button
  on:click
  on:mouseover
  on:mouseenter
  on:mouseleave
  on:focus
  class={`w-16 h-16 flex items-center justify-center rounded bg-green-500 hover:bg-green-600 ${
    $$props.class || ''
  }`}><Icon icon={plus} width={48} slot="icon" /></button
>
