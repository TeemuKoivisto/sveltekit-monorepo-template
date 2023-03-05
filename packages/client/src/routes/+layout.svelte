<script>
  import { onMount } from 'svelte'

  import { USE_MSW } from '$config'

  import '../tailwind.css'

  onMount(async () => {
    if (USE_MSW) {
      const { worker } = await import('../msw')
      await worker.start()
    }
  })
</script>

<slot />
