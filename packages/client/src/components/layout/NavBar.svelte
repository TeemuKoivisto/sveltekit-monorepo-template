<script>
  import { UserRole } from '@awesome-org/lib'

  import { user, isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  function loginLogoutClick() {
    if ($isLoggedIn) {
      authActions.logout()
      goto('/')
    }
  }
</script>

<div class="py-4 bg-primary-dark">
  <nav class="flex items-center px-12 py-1 justify-between xs:flex-row xs:items-start">
    <div>
      <a data-sveltekit-preload-data="hover" href="/" class="hover:underline text-white">
        Example
      </a>
      {#if isLoggedIn && $user}
        <a data-sveltekit-preload-data="hover" href="/account" class="hover:underline text-white">
          {$user.firstname}
        </a>
      {/if}
      {#if $user?.role === UserRole.ADMIN}
        <a data-sveltekit-preload-data="hover" href="/users" class="hover:underline text-white">
          Users
        </a>
      {/if}
    </div>
    <div>
      {#if $isLoggedIn}
        <button on:click={loginLogoutClick} class="hover:underline text-white">logout</button>
      {:else}
        <a data-sveltekit-preload-data="hover" href="/login" class="hover:underline text-white">
          login
        </a>
      {/if}
    </div>
  </nav>
</div>

<style lang="postcss">
  a + a {
    @apply pl-4;
  }
</style>
