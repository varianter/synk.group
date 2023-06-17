<script>
  import Header from '$lib/Header.svelte';
</script>

<div class="relative flex h-full flex-col bg-brand-beige font-serif font-light">
  <Header />

  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
