<script lang="ts">
  import { isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  import SignUpForm from '$components/SignUpForm.svelte'

  import type { ISignUpParams } from '@awesome-org/types'

  let loading = false,
    signUpError: string | null = null
  $: {
    if ($isLoggedIn) {
      goto('/')
    }
  }
  async function handleSubmit(e: CustomEvent<ISignUpParams>) {
    loading = true
    const resp = await authActions.signUp(e.detail)
    loading = false
    if ('err' in resp) {
      signUpError = resp.err
    } else {
      signUpError = null
      goto('/login')
    }
  }
</script>

<div class="w-full h-full p-8 absolute flex items-center justify-center">
  <div class="flex items-center main-bg">
    <section class="w-[32rem] p-16 mx-auto inline-block bg-zinc-800 text-container rounded-2xl">
      <h1 class="mb-8 text-4xl font-bold cursive text-center">Sign up</h1>
      <div>
        <SignUpForm {loading} error={signUpError} on:submit={handleSubmit} />
      </div>
    </section>
  </div>
</div>

<style lang="scss">
</style>
