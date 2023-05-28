<script>
  import Header from '$lib/Header.svelte';
</script>

<div class="flex h-full flex-col bg-brand-beige">
  <Header />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
