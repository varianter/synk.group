<script lang="ts">
  import CircleSeparator from './icons/CircleSeparator.svelte';
  import type { Track } from './types';
  import TrackPreview from './TrackPreview.svelte';
  import { BarChart2Icon } from 'svelte-feather-icons';

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
  class="group relative flex h-full w-[31.25rem] min-w-[31.25rem] flex-col items-start overflow-hidden rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat p-4"
>
  <p class="rounded-full bg-black px-3 py-0.5 font-sans font-normal text-white">
    {track.genre}
  </p>

  <TrackPreview {track} {index} className="group-hover:mb-4" />

  <div class="relative mt-auto w-full">
    <div
      class="relative z-10 col-span-full row-span-full flex w-full flex-col gap-4 rounded-xl bg-green-600 p-4 transition-all group-hover:mb-14"
    >
      <p class="text-xl font-normal text-white/70">
        {track.artist.name}
      </p>

      <p class="text-wonky relative break-words text-5xl leading-tight">
        {track.title}
      </p>
    </div>

    <div
      class="absolute bottom-0 left-0 right-0 z-0 flex items-center gap-1.5 overflow-hidden whitespace-nowrap rounded-b-xl bg-green-800 p-4 pt-8 font-sans text-lg font-normal"
    >
      <BarChart2Icon />
      <span>870 avspillinger</span>
      <CircleSeparator />
      <span>24 avspillinger siste 7 dager</span>
      <CircleSeparator />
      <span class="text-white text-opacity-70">
        {prettyPrintDuration(track.duration)}
      </span>
      <CircleSeparator />
      <span>Hallo i luken</span>
    </div>
  </div>
</div>
