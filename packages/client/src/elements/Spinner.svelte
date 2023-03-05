<script lang="ts">
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import spinner from '@iconify-icons/mdi/reload.js'
</script>

<div class="spinner">
  <Icon icon={spinner} width={24} />
</div>

<style>
  .spinner {
    align-items: center;
    animation: spin 1s linear infinite;
    display: flex;
    justify-content: center;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
