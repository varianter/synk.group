<script lang="ts">
  import GenreHeader from '$lib/GenreHeader.svelte';
  import { page } from '$app/stores';
</script>

<div class="flex h-full flex-col bg-[#176877] font-bold text-white">
  <GenreHeader genre={$page.params.genre} />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
