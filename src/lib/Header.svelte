<script lang="ts">
  import UserIcon from '$lib/icons/UserIcon.svelte';
  import { MenuIcon } from 'svelte-feather-icons';
  const date = new Date();
  const options: any = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('nb-NO', options);

  export let toggleMenu = () => {};
</script>

<header class="grid items-center p-8 text-3xl">
  <nav class="flex justify-between">
    <div class="flex items-center gap-x-12">
      <button on:click={toggleMenu} class="rounded-xl p-3 transition hover:bg-black/10">
        <MenuIcon size="20" />
      </button>
      <div><span class="font-medium">Synk.</span>Variant</div>
    </div>

    <div class="flex items-center gap-x-12">
      <span>{formattedDate}</span>
      <UserIcon />
    </div>
  </nav>
</header>
