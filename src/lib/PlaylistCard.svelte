<script lang="ts">
  import TrackPreview from './TrackPreview.svelte';
  import PlaylistCardMetadata from './PlaylistCardMetadata.svelte';
  import type { ComponentProps } from 'svelte';
  import type { Track } from '$lib/types';
  import _ from 'lodash';
  import {
    originalPlaylistBackgroundColor,
    playlistBackgroundColor,
    playlistBackgroundTimeout
  } from '$lib/utils/stores';

  export let track: Track;
  export let index: number;

  let metadataComponent: Omit<ComponentProps<PlaylistCardMetadata>, 'track'>;

  function handleTimeout(callback: () => void, delay: number) {
    if ($playlistBackgroundTimeout) clearTimeout($playlistBackgroundTimeout);

    $playlistBackgroundTimeout = setTimeout(callback, delay);
  }
</script>

<div
  style="--image-url: url({track.coverart})"
  class="group relative flex h-full w-[31.25rem] min-w-[31.25rem] flex-col items-start overflow-hidden rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat p-4"
  on:mouseenter={() => {
    metadataComponent?.startScroll?.();

    handleTimeout(() => {
      if (track.color) $playlistBackgroundColor = track.color;
    }, 500);
  }}
  on:mouseleave={() => {
    metadataComponent?.stopScroll?.();

    handleTimeout(() => {
      $playlistBackgroundColor = $originalPlaylistBackgroundColor;
    }, 1000);
  }}
>
  <p class="rounded-full bg-black px-3 py-0.5 font-sans font-normal text-white">
    {track.genre}
  </p>

  <TrackPreview className="group-hover:mb-4" {track} {index} />

  <div class="relative mt-auto w-full">
    <div
      style="background-color: {track.color}"
      class="relative z-10 col-span-full row-span-full flex w-full flex-col gap-4 rounded-xl p-4 transition-all group-hover:mb-14"
    >
      <p class="text-xl font-normal text-white/70">
        {_.sortBy(track.artists, 'order')
          .map((artist) => artist.name)
          .join(', ')}
      </p>

      <p class="text-wonky relative break-words text-5xl leading-tight">
        {track.title}
      </p>
    </div>

    <PlaylistCardMetadata {track} bind:this={metadataComponent} />
  </div>
</div>
