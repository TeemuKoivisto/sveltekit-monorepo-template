<script lang="ts">
  import { isLoggedIn } from '$stores/auth'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  import SignUpForm from '$components/SignUpForm.svelte'

  import type { ISignUpParams } from '@teemukoivisto/types'

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

<div class="w-full p-8 absolute bg-gray-100">
  <div class="relative inset-0 flex items-center main-bg">
    <section class="p-16 mx-auto inline-block bg-white text-container border rounded-2xl">
      <h1 class="mb-8 text-5xl font-bold cursive">sign up</h1>
      <div>
        <SignUpForm {loading} error={signUpError} on:submit={handleSubmit} />
      </div>
    </section>
  </div>
</div>

<style lang="scss">
</style>
