<script lang="ts">
  import { onMount } from 'svelte'

  import { isLoggedIn } from '$stores/auth'
  import { users, userActions } from '$stores/user'
  import { goto } from '$app/navigation'

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
  <h1 class="mt-4 mb-12 text-5xl font-bold cursive">Users</h1>
  <div>
    <table class="w-full">
      <thead>
        <tr>
          <th>Role</th>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Email</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {#each $users as user}
          <tr class="">
            <td>{user.role}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>
              <button class="btn-xs bg-green-600 hover:raise hover:bg-green-700">
                <a data-sveltekit:prefetch href={`users/${user.id}`}> Edit </a>
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

<style lang="scss">
  tr:nth-child(even) {
    @apply bg-gray-800;
  }
  td {
    @apply p-2 text-center;
  }
</style>
