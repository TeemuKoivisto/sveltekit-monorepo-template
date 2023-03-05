<script lang="ts">
  import { onMount } from 'svelte'

  import { isLoggedIn } from '$stores/auth'
  import { users, userActions } from '$stores/user'
  import { goto } from '$app/navigation'

  import Button from '$elements/Button.svelte'

  let loading = false
  $: {
    if (typeof window !== 'undefined' && !$isLoggedIn) {
      goto('/login')
    }
  }

  onMount(() => {
    userActions.listUsers()
  })
</script>

<section class="p-4 h-full m-auto items-center lg:container md:p-16 md:pt-16 xs:p-8 rounded-2xl">
  <h1 class="mb-8 text-5xl font-bold cursive">Users</h1>
  <div>
    <ul>
      <li class="flex flex-wrap justify-center items-center">
        <span class="col font-bold">Role</span>
        <span class="col font-bold">Firstname</span>
        <span class="col font-bold">Lastname</span>
        <span class="col font-bold">Email</span>
        <div />
      </li>
      {#each $users as user}
        <li class="py-2 justify-center items-center ">
          <span class="col">{user.role}</span>
          <span class="col">{user.firstname}</span>
          <span class="col">{user.lastname}</span>
          <span class="col">{user.email}</span>
          <Button class="bg-green-300 py-1 px-2">
            <a data-sveltekit:prefetch href={`users/${user.id}`}> Edit </a>
          </Button>
        </li>
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  ul {
    & > li:nth-child(even) {
      background: #f3f3f3;
    }
  }
  li {
    display: flex;
    flex-wrap: wrap;
  }

  .col {
    flex: 0 0 20%;
    max-width: 20%;
  }
</style>
