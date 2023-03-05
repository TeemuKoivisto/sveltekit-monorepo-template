<script lang="ts">
  import { get } from 'svelte/store'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import type { IUser } from '@awesome-org/types'

  import { user, isLoggedIn } from '$stores/auth'
  import { userActions } from '$stores/user'
  import { goto } from '$app/navigation'

  import Spinner from '$elements/Spinner.svelte'
  import UserCircle from '$elements/UserCircle.svelte'

  let editedUser: IUser | undefined

  onMount(async () => {
    const params = get(page).params
    const resp = await userActions.getUser(params.user_id)
    if ('data' in resp) {
      editedUser = resp.data
      ;(firstName = editedUser?.firstname),
        (lastName = editedUser?.lastname),
        (initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase()),
        (email = editedUser?.email),
        (error = null)
    }
  })

  let loading = false,
    firstName = editedUser?.firstname,
    lastName = editedUser?.lastname,
    initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase(),
    email = editedUser?.email,
    error: string | null = null

  // $: {
  //   nameText = category.name
  //   categoryItems = category.items
  // }

  $: {
    if (typeof window !== 'undefined' && !$isLoggedIn) {
      goto('/login')
    }
  }

  async function handleSubmit() {
    if ($user === null) {
      error = 'Not logged in'
      return
    }
    loading = true
    const resp = await userActions.editUser($user.id, {
      firstname: firstName,
      lastname: lastName,
      email
    })
    loading = false
    if ('err' in resp) {
      error = resp.err
    } else {
      error = null
    }
  }
  function handleCancel() {
    firstName = editedUser?.firstname
    lastName = editedUser?.lastname
    initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase()
    email = editedUser?.email
  }
  async function handleDelete() {
    // confirm modal maybe lol
    const confirmed = confirm('Are you sure you want to delete this account?')
    if (confirmed && $user) {
      userActions.deleteUser($user.id)
    }
  }
</script>

<section class="p-4 h-full m-auto flex lg:container md:p-16 md:pt-16 xs:p-8 rounded-2xl">
  <div class="flex mr-8">
    <UserCircle>{initials}</UserCircle>
  </div>
  <form on:submit|preventDefault={handleSubmit} class="w-full items-center">
    <h1 class="text-5xl font-bold flex items-center">Edit user: {firstName}</h1>
    <hr />
    <div class="field">
      <label for="account-first-name">First name</label>
      <div class="input">
        <input
          required
          id="account-first-name"
          name="first-name"
          autoComplete="on"
          bind:value={firstName}
        />
      </div>
    </div>
    <div class="field">
      <label for="account-last-name">Last name</label>
      <div class="input">
        <input
          required
          id="account-last-name"
          name="last-name"
          autoComplete="on"
          bind:value={lastName}
        />
      </div>
    </div>
    <div class="field">
      <label for="account-email">Email</label>
      <div class="input">
        <input
          required
          id="account-email"
          type="email"
          name="email"
          autoComplete="on"
          placeholder="Email"
          bind:value={email}
        />
      </div>
    </div>
    <hr />
    <div class="flex buttons">
      <button class="btn-sm bg-green-600 hover:bg-green-700" type="submit">
        {#if loading}
          <Spinner />
        {:else}
          Update
        {/if}
      </button>
      <button on:click={handleDelete} class="btn-sm bg-red-600 hover:bg-red-700 ml-4" type="button"
        >Delete</button
      >
      <button
        on:click={handleCancel}
        class="btn-sm bg-transparent ml-4 border-gray-300 hover:border-gray-400"
        type="button">Cancel</button
      >
    </div>
    {#if error}
      <div class="error">{error}</div>
    {/if}
  </form>
</section>

<style lang="scss">
  .left-side {
    overflow: hidden;
  }
  .field {
    @apply flex w-full;
    & > label {
      flex: 0 0 25%;
      max-width: 25%;
      @apply mr-4 font-bold rounded flex items-center;
    }
    & > .input {
      flex: 0 0 75%;
      max-width: 75%;
      @apply px-4;
      input {
        @apply bg-zinc-600 px-2 py-1 rounded w-full;
      }
    }
  }
  .field + .field {
    @apply my-4;
  }
  hr {
    @apply my-8 border-gray-300;
  }
  .error {
    color: red;
    font-size: 0.9rem;
    margin: 1rem 0 0 0;
  }
</style>
