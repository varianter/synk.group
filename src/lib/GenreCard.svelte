<script lang="ts">
  import CircleSeparator from './icons/CircleSeparator.svelte';
  import type { Track } from './types';
  import TrackPreview from './TrackPreview.svelte';

  export let track: Track;
  export let index: number;

  function prettyPrintDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = `${duration % 60}`.padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
</script>

<div
  style="--image-url: url({track.coverart})"
  class="relative flex h-full w-[31.25rem] min-w-[31.25rem] flex-col items-start overflow-hidden rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat p-4 hover:outline hover:outline-white"
>
  <p class="rounded-full bg-black px-3 py-0.5 font-sans font-normal text-white">{track.genre}</p>

  <TrackPreview {track} {index} />

  <div class="relative mt-auto w-full pt-14">
    <div
      class="absolute left-0 top-0 h-[calc(100%+1rem)] w-[calc(100%+2rem)] -translate-x-4 bg-gradient-to-t from-black to-transparent"
    />

    <p class="text-wonky relative mx-4 mb-4 break-words text-5xl leading-tight">{track.title}</p>

    <div class="relative m-4 flex items-center gap-1.5 font-sans text-lg font-normal">
      <img src={track.artist.image} alt="" class="mr-0.5 rounded-full" height="24" width="24" />
      <span>{track.artist.name}</span>
      <CircleSeparator />
      <span class="text-white text-opacity-70">{track.year}</span>
      <CircleSeparator />
      <span class="text-white text-opacity-70">{prettyPrintDuration(track.duration)}</span>
    </div>
  </div>
</div>
