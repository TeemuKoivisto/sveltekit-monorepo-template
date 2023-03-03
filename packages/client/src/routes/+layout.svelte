<script>
  import { onMount } from 'svelte'

  import NavBar from '$components/layout/NavBar.svelte'
  import Footer from '$components/layout/Footer.svelte'
  import '../tailwind.css'

  import { USE_MSW } from '$config'

  onMount(async () => {
    if (USE_MSW) {
      const { worker } = await import('../msw')
      await worker.start()
    }
  })
</script>

<div>
  <NavBar />
  <main class="min-h-screen">
    <slot />
  </main>
  <Footer />
</div>
