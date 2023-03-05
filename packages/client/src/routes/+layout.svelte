<script>
  import { onMount } from 'svelte'

  onMount(async () => {
    if (USE_MSW) {
      const { worker } = await import('../msw')
      await worker.start()
    }
  })
</script>

<slot />
