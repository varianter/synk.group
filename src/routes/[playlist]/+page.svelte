<script lang="ts">
  import type { PageData } from './$types';
  import GenreCard from '$lib/GenreCard.svelte';

  export let data: PageData;
</script>

<main class="flex h-full gap-x-8 overflow-x-auto p-8 pt-4">
  {#each data.playlist.tracks as track, index}
    <GenreCard {track} {index} />
  {/each}
</main>
