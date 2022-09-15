<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import emailIcon from '@iconify-icons/mdi/email.js'
  import lock from '@iconify-icons/mdi/lock.js'

  import FormField from '$elements/FormField.svelte'
  import Spinner from '$elements/Spinner.svelte'

  import type { ILoginParams } from '@teemukoivisto/types'

  export let loading = false,
    error: string | null = null

  const dispatch = createEventDispatcher<{ submit: ILoginParams }>()

  let email = '',
    password = '',
    validationError: string | null = null

  function handleSubmit() {
    dispatch('submit', { email, password })
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class={`${$$props.class} flex items-center flex-col justify-center`}
>
  <div class="w-full">
    <label for="login-email">Email</label>
    <FormField class="w-full">
      <Icon icon={emailIcon} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="login-email"
        type="email"
        name="email"
        class="w-full"
        autoComplete="on"
        placeholder="Email"
        bind:value={email}
      />
    </FormField>
  </div>
  <div class="mt-2 w-full">
    <label for="login-password" class="flex justify-between">
      Password
      <!-- <a href="/password/reset" class="text-xs text-blue-900">Forgot password?</a> -->
    </label>
    <FormField class="w-full">
      <Icon icon={lock} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="login-password"
        type="password"
        name="password"
        autocomplete="on"
        placeholder="********"
        bind:value={password}
      />
    </FormField>
  </div>
  {#if validationError || error}
    <div class="error">{validationError || error}</div>
  {/if}
  <button
    class="flex justify-center w-full px-4 py-2 mt-5 leading-tight text-white bg-red-500 rounded"
    type="submit"
  >
    {#if loading}
      <Spinner />
    {:else}
      Log in
    {/if}
  </button>
  <a
    data-sveltekit:prefetch
    href="signup"
    class="px-4 py-2 mt-5 leading-tight text-center rounded hover:underline"
  >
    Register
  </a>
</form>

<style>
  .error {
    color: red;
    font-size: 0.9rem;
    margin: 1rem 0 0 0;
  }
</style>
