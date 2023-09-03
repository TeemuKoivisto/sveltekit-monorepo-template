<script lang="ts">
  type Size = 'small' | 'medium' | 'large'

  export let size: Size = 'medium'
</script>

<div class={`${$$props.class || ''} ${size} circle`}>
  <slot />
</div>

<style lang="scss">
  .circle {
    align-items: center;
    background: red;
    border-radius: 50%;
    color: #fff;
    display: flex;
    justify-content: center;
    user-select: none;

    &.small {
      font-size: 1rem;
      padding: 0.5rem;
      height: 2.5rem;
      width: 2.5rem;
    }

    &.medium {
      font-size: 2rem;
      padding: 1rem;
      height: 5rem;
      width: 5rem;
    }
  }
</style>
