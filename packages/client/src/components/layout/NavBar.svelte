<script>
  import { UserRole } from '@awesome-org/types'

  import { user, isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  function loginLogoutClick() {
    if ($isLoggedIn) {
      authActions.logout()
    } else {
      goto('/login')
    }
  }
</script>

<div class="py-4 bg-red-500">
  <nav class="flex items-center px-12 py-1 justify-between xs:flex-row xs:items-start">
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
    </div>
    <div>
      <button on:click={loginLogoutClick} class="hover:underline text-white"
        >{$isLoggedIn ? 'logout' : 'login'}</button
      >
    </div>
  </nav>
</div>

<style lang="scss">
  a + a {
    @apply pl-4;
  }
</style>
