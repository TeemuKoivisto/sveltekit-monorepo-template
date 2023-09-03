<script lang="ts">
  import { createPopper } from '@popperjs/core'

  import { click_outside } from '$actions/click_outside'

  import type { Instance, OptionsGeneric, Modifier } from '@popperjs/core'

  let open = false
  let dropdownListEl: HTMLElement
  let popperEl: HTMLElement
  let popperInstance: Instance | undefined

  export let id: string | undefined = undefined

  function handleOpen() {
    open = !open
    if (open) {
      createPopper(dropdownListEl, popperEl, {
        placement: 'bottom'
      })
    } else {
      popperInstance?.destroy()
    }
  }

  function handleClickOutside() {
    open = false
    popperInstance?.destroy()
  }
</script>

<button
  aria-describedby={id}
  use:click_outside={handleClickOutside}
  on:click={handleOpen}
  bind:this={dropdownListEl}>I'm a button</button
>
<div class="tooltip" {id} class:hidden={!open} bind:this={popperEl} role="tooltip">
  <slot>I'm a tooltip</slot>
</div>

<style lang="scss">
  .tooltip {
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 13px;
  }
</style>
