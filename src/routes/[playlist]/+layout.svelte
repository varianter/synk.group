<script lang="ts">
  import PlaylistHeader from '$lib/PlaylistHeader.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<div
  style="background-color: {data.playlist.color}"
  class="flex h-full flex-col font-bold text-white"
>
  <PlaylistHeader playlistName={data.playlist.name} />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
