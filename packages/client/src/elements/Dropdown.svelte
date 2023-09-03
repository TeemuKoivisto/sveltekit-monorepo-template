<script lang="ts">
  import { click_outside } from '$actions/click_outside'

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

  function handleClickOutside() {
    open = false
  }

  function handleOpen() {
    if (!disabled) {
      open = !open
    }
  }
</script>

<div class="relative mb-6 w-40" {id} use:click_outside={handleClickOutside}>
  <button class="w-full open-btn" class:disabled class:open on:click={handleOpen}>
    <slot>
      <span>
        {selectedKey.value}
      </span>
    </slot>
  </button>
  <div class="wrapper" style:display={open ? 'block' : 'none'}>
    <ul>
      {#each options as { key, value }, idx}
        <li class:selected={selectedKey.key === key}>
          <button class="w-full h-full" on:click={() => onSelect(idx)}>{value}</button>
        </li>
      {/each}
    </ul>
  </div>
</div>

<style lang="scss">
  .open-btn {
    align-items: center;
    border: 1px solid #aaa;
    cursor: pointer;
    color: #222;
    display: flex;
    padding: 10px 20px 10px 20px;
    &:hover {
      background-color: #eee;
    }
    &:after {
      pointer-events: none;
      position: absolute;
      content: '';
      right: 1rem;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 8px solid rgba(0, 0, 0, 0.5);
      transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      z-index: 9;
    }
    &.open:after {
      border-top: 8px solid rgba(0, 0, 0, 1);
      transform: rotate(180deg);
    }
    &.disabled {
      cursor: initial;
      opacity: 0.5;
      &:hover {
        background-color: initial;
      }
    }
  }
  .wrapper {
    position: relative;
  }
  ul {
    color: #aaa;
    display: block;
    left: 0;
    position: absolute;
    top: 0;
    border-width: 0 1px 1px 1px;
    border-color: #aaa;
    border-style: solid;
    transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    width: 100%;
  }
  li > button {
    background: #fff;
    border-bottom: 1px solid #e5e5e5;
    cursor: pointer;
    line-height: 20px;
    padding: 10px 20px 10px 20px;
    transition: all 0.4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
    &:hover {
      background-color: #eee;
    }
  }
  .selected {
    color: #222;
  }
</style>
