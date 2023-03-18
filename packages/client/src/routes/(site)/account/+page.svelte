<script lang="ts">
  import { onMount } from 'svelte'

  import { user, isLoggedIn } from '$stores/auth'
  import { userActions } from '$stores/user'
  import { authActions } from '$stores/auth.actions'
  import { goto } from '$app/navigation'

  import UserCircle from '$elements/UserCircle.svelte'

  let loading = false,
    firstName = $user?.firstname,
    lastName = $user?.lastname,
    initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase(),
    email = $user?.email,
    error: string | null = null

  $: {
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href)
        const parsedUser = JSON.parse(url.searchParams.get('user') || '')
        const parsedJwt = JSON.parse(url.searchParams.get('jwt') || '')
        if (parsedUser && parsedJwt) {
          authActions.handleGoogleSignIn(parsedUser, parsedJwt)
          firstName = $user?.firstname
          lastName = $user?.lastname
          initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase()
          email = $user?.email
        }
        url.searchParams.delete('user')
        url.searchParams.delete('jwt')
        window.history.pushState({}, '', url)
      } catch (err) {}
    }
  }

  onMount(() => {
    if (!$isLoggedIn) {
      goto('/login')
    }
  })

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
    firstName = $user?.firstname
    lastName = $user?.lastname
    initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase()
    email = $user?.email
  }
  async function handleDelete() {
    // confirm modal maybe lol
    const confirmed = confirm('Are you sure you want to delete your account?')
    if (confirmed && $user) {
      userActions.deleteUser($user.id)
    }
  }
</script>

<section class="mt-8 p-4 h-full m-auto flex lg:container md:p-16 md:pt-8 xs:p-8 rounded-2xl">
  <div class="flex mr-8">
    <UserCircle>{initials}</UserCircle>
  </div>
  <form on:submit|preventDefault={handleSubmit} class="w-full">
    <h1 class="text-5xl font-bold flex items-center">Account</h1>
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
    <div class="buttons flex">
      <button class="btn-sm bg-green-600 hover:bg-green-700" type="submit" disabled={loading}
        >Update</button
      >
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
