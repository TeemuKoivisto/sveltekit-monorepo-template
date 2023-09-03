<script>
  import { goto } from '$app/navigation'

  import { user, initials, isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'

  import Dropdown from '$elements/Dropdown.svelte'
  import UserCircle from '$elements/UserCircle.svelte'

  import { UserRole } from '@awesome-org/types'

  const options = [
    { key: 'free-verse', value: 'Free verse' },
    { key: 'sonnet', value: 'Sonnet' }
  ]
  let selected = options[0]

  function loginLogoutClick() {
    if ($isLoggedIn) {
      authActions.logout()
      goto('/')
    }
  }
</script>

<div class="py-4 bg-primary-dark">
  <nav class="h-10 flex items-center px-12 py-1 justify-between">
    <div>
      <a data-sveltekit:prefetch href="/" class="hover:underline text-white"> Example </a>
      {#if isLoggedIn && $user}
        <a data-sveltekit:prefetch href="/account" class="hover:underline text-white">
          {$user.firstname}
        </a>
      {/if}
      {#if $user?.role === UserRole.ADMIN}
        <a data-sveltekit:prefetch href="/users" class="hover:underline text-white"> Users </a>
      {/if}
      <Dropdown
        {options}
        selectedKey={selected}
        onSelect={idx => {
          selected = options[idx]
        }}
      >
        <UserCircle size="small">{$initials}</UserCircle>
      </Dropdown>
    </div>
    <div>
      {#if $isLoggedIn}
        <button on:click={loginLogoutClick} class="text-white">
          <UserCircle size="small">{$initials}</UserCircle>
        </button>
      {:else}
        <a data-sveltekit:prefetch href="/login" class="hover:underline text-white"> login </a>
      {/if}
    </div>
  </nav>
</div>

<style lang="scss">
  a + a {
    @apply pl-4;
  }
</style>
