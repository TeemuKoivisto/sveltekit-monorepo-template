<script lang="ts">
  import { isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  import LoginForm from '$components/LoginForm.svelte'

  import type { ILoginParams } from '@awesome-org/types'

  import { API_URL } from '$config'

  let loading = false,
    loginError: string | null = null
  $: {
    if (typeof window !== 'undefined' && !$isLoggedIn) {
      goto('/login')
    }
  }
  async function handleSubmit(e: CustomEvent<ILoginParams>) {
    loading = true
    const resp = await authActions.login(e.detail)
    loading = false
    if ('err' in resp) {
      loginError = resp.err
    } else {
      loginError = null
      goto('/users')
    }
  }
</script>

<div class="h-full w-full absolute bg-gray-100">
  <div class="absolute inset-0 flex items-center main-bg">
    <section class="w-[32rem] p-16 mx-auto inline-block bg-white text-container border rounded-2xl">
      <h1 class="mb-10 text-4xl font-bold cursive text-center">Sign in</h1>
      <div>
        <a
          class="py-3 px-2 border border-gray-400 text-lg flex items-center justify-center hover:border-gray-600 rounded w-full"
          href={`${API_URL}/google/login`}
        >
          <img class="mx-3 h-[20px]" src="google-logo.svg" alt="Google logo" />
          <div>Sign in with Google</div>
        </a>
        <hr class="mt-10 mb-8 border-gray-400" />
        <LoginForm {loading} error={loginError} on:submit={handleSubmit} />
      </div>
    </section>
  </div>
</div>

<style>
</style>
