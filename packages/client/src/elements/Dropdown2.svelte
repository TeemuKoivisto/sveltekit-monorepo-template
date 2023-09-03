<script lang="ts">
  import { createPopper } from '@popperjs/core'

  import { click_outside } from '$actions/click_outside'

  import type { Instance, OptionsGeneric, Modifier } from '@popperjs/core'

  interface Option {
    key: string
    value: string
  }

  export let options: Option[],
    selectedKey: Option,
    id: string | undefined = undefined,
    disabled: boolean = false,
    onSelect: (idx: number) => void

  let open = false
  let dropdownListEl: HTMLElement
  let popperEl: HTMLElement
  let popperInstance: Instance | undefined

  function handleClickOutside() {
    open = false
  }

  function handleOpen() {
    if (!disabled) {
      open = !open
      if (open) {
        openPopper(popperEl, dropdownListEl, {
          placement: 'bottom',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8]
              }
            }
          ]
        })
      }
    }
  }

  function openPopper(
    target: HTMLElement,
    content: HTMLElement,
    opts?: Partial<OptionsGeneric<Partial<Modifier<any, any>>>>
  ) {
    closePopper()
    popperEl.appendChild(content)
    popperEl.setAttribute('data-show', '')
    popperInstance = createPopper(target, popperEl, opts)
  }

  function updatePopper() {
    if (popperInstance) {
      popperInstance.update()
    }
  }

  function closePopper() {
    if (popperInstance) {
      // while (popperEl.hasChildNodes()) {
      //   popperEl.removeChild(popperEl.firstChild as ChildNode)
      // }
      popperEl.removeAttribute('data-show')
      popperInstance.destroy()
    }
  }
</script>

<div class="popup" bind:this={popperEl} />
<button
  {id}
  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  type="button"
  use:click_outside={handleClickOutside}
  on:click={handleOpen}
  on:mouseover={handleOpen}
  on:focus={handleOpen}
  >Dropdown button <svg
    class="w-4 h-4 ml-2"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ><path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M19 9l-7 7-7-7"
    /></svg
  ></button
>
<div
  class="dropdown-list z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
  class:hidden={!open}
  bind:this={dropdownListEl}
>
  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby={id}>
    {#each options as { key, value }, idx}
      <li class:selected={selectedKey.key === key}>
        <!-- <button class="w-full h-full" on:click={() => onSelect(idx)}>{value}</button> -->
        <a
          href="#"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >Dashboard</a
        >
      </li>
    {/each}
  </ul>
</div>

<style lang="scss">
  .dropdown-list {
    // position: absolute;
    // inset: 0px auto auto 0px;
    // margin: 0px;
    // transform: translate3d(327px, 70px, 0px);
  }
  .popup {
    color: #353535;
    font-family: 'PT Sans', sans-serif;
    min-width: 100px;
    position: absolute;
    width: auto;
    z-index: 5;
    opacity: 1;
  }

  .popup[data-show] {
    display: inline-block;
  }

  .popup-arrow,
  .popup-arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
  }

  .popup-arrow {
    visibility: hidden;
  }

  .popup-arrow::before {
    visibility: visible;
    content: '';
    transform: rotate(45deg);
  }

  .popup[data-popper-placement^='bottom'] > .popup-arrow {
    top: -5px;
    left: calc(50% - 5px);
    border-bottom-color: #e2e2e2;
    border-top-width: 0;
    margin: 0 5px;
  }

  .popup[data-popper-placement^='top'] > .popup-arrow {
    bottom: -5px;
    left: calc(50% - 5px);
    border-top-color: #e2e2e2;
    border-bottom-width: 0;
    margin: 0 5px;
  }

  .popup[data-popper-placement^='left'] > .popup-arrow {
    right: -5px;
    top: calc(50% - 5px);
    border-left-color: #e2e2e2;
    border-right-width: 0;
    margin: 5px 0;
  }

  .popup[data-popper-placement^='right'] > .popup-arrow {
    left: -5px;
    top: calc(50% - 5px);
    border-right-color: #e2e2e2;
    border-left-width: 0;
    margin: 5px 0;
  }

  .popup .equation-editor {
    position: relative;
    min-width: 500px;
    max-width: 800px;
  }

  .popup .equation-editor:first-child {
    background: #fff;
    border: 1px solid #e2e2e2;
    box-shadow: 0 4px 9px 0 rgb(84 83 83 / 30%);
    height: auto;
    min-height: 4em;
  }

  .popup .equation-editor-info {
    align-items: center;
    border: 1px solid #e2e2e2;
    border-radius: 50%;
    bottom: 6px;
    color: #6e6e6e;
    display: inline-flex;
    cursor: pointer;
    font-size: 12px;
    height: 16px;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    right: 6px;
    text-decoration: none;
    width: 16px;
    z-index: 2;
  }

  .popup .equation-editor-info:hover {
    opacity: 1;
  }

  .popup .cm-scroller {
    max-height: 400px;
  }

  .popup .cm-placeholder {
    color: #999 !important;
  }
</style>
