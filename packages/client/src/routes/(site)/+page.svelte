<script lang="ts">
  import Dropdown2 from '$elements/Dropdown2.svelte'
  import Tooltip from '$elements/Tooltip.svelte'

  const options = [
    { key: 'free-verse', value: 'Free verse' },
    { key: 'sonnet', value: 'Sonnet' }
  ]
  let selected = options[0]
</script>

<section class="p-4 h-full m-auto lg:container md:p-16 md:pt-8 xs:p-8 rounded-2xl">
  <header class="flex flex-col items-center mt-8">
    <h1 class="my-3 text-5xl font-bold flex items-center hover:underline">
      <a href="https://github.com/TeemuKoivisto/sveltekit-monorepo-template"
        >sveltekit-monorepo-template</a
      >
    </h1>
    <em>Your amazing app.</em>
    <div class="mt-6" />
    <Dropdown2
      {options}
      selectedKey={selected}
      onSelect={idx => {
        selected = options[idx]
      }}
    />
    <p>poop</p>
    <Tooltip>
      hello tooltip
    </Tooltip>
    <p>asdf</p>
  </header>
</section>

<style lang="scss">
</style>
