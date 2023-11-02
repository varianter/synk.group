<script lang="ts">
  import PlaylistHeader from '$lib/PlaylistHeader.svelte';
  import type { LayoutData } from './$types';
  import {
    originalPlaylistBackgroundColor,
    playlistBackgroundColor
  } from '$lib/utils/stores';

  export let data: LayoutData;

  $: $playlistBackgroundColor = $originalPlaylistBackgroundColor =
    data.playlist.color;
</script>

<div
  style="background-color: {$playlistBackgroundColor}; transition: background-color 2s cubic-bezier(0.12, 0, 0, 1);"
  class="flex h-full flex-col font-bold text-white"
>
  <PlaylistHeader playlistName={data.playlist.name} />
  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
