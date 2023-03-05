<script>
  import NavBar from '$components/layout/NavBar.svelte'
  import Footer from '$components/layout/Footer.svelte'
</script>

<div>
  <NavBar />
  <main class="min-h-screen">
    <slot />
  </main>
  <Footer />
</div>
