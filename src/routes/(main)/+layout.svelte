<script>
  import Header from '$lib/Header.svelte';
  import MainNavigation from '$lib/MainNavigation.svelte';

  let showMenu = false;
  const toggleMenu = () => (showMenu = !showMenu);
</script>

<div class="relative flex h-full flex-col bg-brand-beige font-serif font-light">
  <Header {toggleMenu} />
  {#if showMenu}
    <div
      on:mousedown={() => (showMenu = false)}
      class="absolute left-0 top-0 h-full w-full cursor-pointer bg-black opacity-60"
    />
    <MainNavigation {toggleMenu} />
  {/if}
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
