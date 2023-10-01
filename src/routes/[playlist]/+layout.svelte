<script lang="ts">
  import GenreHeader from '$lib/GenreHeader.svelte';
  import { page } from '$app/stores';
</script>

<div
  style="background-color: {$page.data.playlist.color}"
  class="flex h-full flex-col font-bold text-white"
>
  <GenreHeader genre={$page.data.playlist.name} />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
