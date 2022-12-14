<script lang="ts">
  import { user, isLoggedIn } from '$stores/auth'
  import { userActions } from '$stores/user'
  import { goto } from '$app/navigation'

  import Button from '$elements/Button.svelte'
  import UserCircle from '$elements/UserCircle.svelte'

  let loading = false,
    firstName = $user?.firstname,
    lastName = $user?.lastname,
    initials = `${(firstName || '').charAt(0)}${(lastName || '').charAt(0)}`.toUpperCase(),
    email = $user?.email,
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
  <div class="flex mr-8 overflow-hidden">
    <div>
      <UserCircle>{initials}</UserCircle>
    </div>
    <div class="mx-4 flex-col justify-between items-center">
      <h3>{$user?.firstname} {$user?.lastname}</h3>
      <small>{$user?.email}</small>
    </div>
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
    <div class="buttons">
      <Button class="bg-green-300 hover:bg-green-400" type="submit" disabled={loading}
        >Update</Button
      >
      <Button
        on:click={handleCancel}
        class="ml-4 border-gray-300 hover:border-gray-400"
        type="button">Cancel</Button
      >
      <Button on:click={handleDelete} class="bg-red-400 hover:bg-red-500 ml-4" type="button"
        >Delete</Button
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
        @apply px-2 py-1 border border-gray-400 rounded w-full;
      }
    }
  }
  .field + .field {
    @apply my-4;
  }
  hr {
    @apply my-8 border-gray-300;
  }
  .left-col {
  }
  .buttons > * {
    margin-left: 4rem;
  }
  .error {
    color: red;
    font-size: 0.9rem;
    margin: 1rem 0 0 0;
  }
</style>
