<script lang="ts">
  import Header from '$lib/Header.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div class="relative flex h-full flex-col bg-brand-beige font-serif font-light">
  <Header playlists={data.playlists} />

  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
