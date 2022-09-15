<script lang="ts">
</script>

<div class={`${$$props.class} circle`}>
  <slot />
</div>

<style lang="scss">
  .circle {
    align-items: center;
    background: red;
    border-radius: 50%;
    color: #fff;
    display: flex;
    font-size: 2rem;
    justify-content: center;
    padding: 1rem;
    width: 5rem;
    height: 5rem;
    user-select: none;
  }
</style>
