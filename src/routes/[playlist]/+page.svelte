<script lang="ts">
  import type { PageData } from './$types';
  import PlaylistCard from '$lib/PlaylistCard.svelte';

  export let data: PageData;
</script>

<main class="flex h-full gap-x-8 overflow-x-auto p-8 pt-4">
  {#each data.playlist.tracks as track, index}
    <PlaylistCard {track} {index} />
  {/each}
</main>
