<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import emailIcon from '@iconify-icons/mdi/email.js'
  import lock from '@iconify-icons/mdi/lock.js'
  import accountCircle from '@iconify-icons/mdi/account-circle.js'

  import FormField from '$elements/FormField.svelte'
  import Spinner from '$elements/Spinner.svelte'

  import type { ISignUpParams } from '@awesome-org/types'

  export let loading = false,
    error: string | null = null

  const dispatch = createEventDispatcher<{ submit: ISignUpParams }>()

  let email = '',
    firstname = '',
    lastname = '',
    password = '',
    passwordAgain = '',
    validationError: string | null = null

  function handleSubmit() {
    if (password !== passwordAgain) {
      validationError = "Passwords don't match"
    } else {
      validationError = null
      dispatch('submit', { email, firstname, lastname, password })
    }
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  class={`${$$props.class} flex items-center flex-col justify-center`}
>
  <div class="row">
    <label for="signup-email">Email</label>
    <FormField>
      <Icon icon={emailIcon} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="signup-email"
        type="email"
        name="email"
        autoComplete="on"
        bind:value={email}
      />
    </FormField>
  </div>
  <div class="row">
    <label for="signup-firstname">First name</label>
    <FormField>
      <Icon icon={accountCircle} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="signup-firstname"
        type="text"
        name="firstname"
        autocomplete="on"
        bind:value={firstname}
      />
    </FormField>
  </div>
  <div class="row">
    <label for="signup-lastname">Last name</label>
    <FormField>
      <Icon icon={accountCircle} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="signup-lastname"
        type="text"
        name="lastname"
        autocomplete="on"
        bind:value={lastname}
      />
    </FormField>
  </div>
  <div class="row">
    <label
      for="signup-password"
      title="Password must be 8 characters long and contain one number, one lowercase and one uppercase letter"
      >Password</label
    >
    <FormField>
      <Icon icon={lock} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="signup-password"
        type="password"
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{'{'}8,{'}'}$"
        name="password"
        autocomplete="on"
        bind:value={password}
      />
    </FormField>
  </div>
  <div class="row">
    <label for="signup-password-check">Password again</label>
    <FormField>
      <Icon icon={lock} width={24} slot="icon" />
      <input
        slot="input"
        required
        id="signup-password-check"
        type="password"
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{'{'}8,{'}'}$"
        name="password"
        autocomplete="on"
        bind:value={passwordAgain}
      />
    </FormField>
  </div>
  {#if validationError || error}
    <div class="error">{validationError || error}</div>
  {/if}
  <button class="btn bg-primary-dark mt-8 w-full hover:raise" type="submit">
    {#if loading}
      <Spinner />
    {:else}
      Create account
    {/if}
  </button>
  <a
    data-sveltekit:prefetch
    href="login"
    class="px-4 py-2 mt-5 leading-tight text-center rounded hover:underline"
  >
    Login
  </a>
</form>

<style>
  label {
    @apply text-sm;
  }
  .row {
    @apply mt-3 w-full;
  }
  .error {
    color: red;
    font-size: 0.9rem;
    margin: 1rem 0 0 0;
  }
</style>
