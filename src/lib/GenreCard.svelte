<script lang="ts">
  import TrackPreview from './TrackPreview.svelte';
  import GenreCardMetadata from './GenreCardMetadata.svelte';
  import type { ComponentProps } from 'svelte';
  import type { Track } from '$lib/types';
  import _ from 'lodash';

  export let track: Track;
  export let index: number;

  let metadataComponent: Omit<ComponentProps<GenreCardMetadata>, 'track'>;
</script>

<div
  style="--image-url: url({track.coverart})"
  class="group relative flex h-full w-[31.25rem] min-w-[31.25rem] flex-col items-start overflow-hidden rounded-3xl bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat p-4"
  on:mouseenter={() => metadataComponent?.startScroll?.()}
  on:mouseleave={() => metadataComponent?.stopScroll?.()}
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

    <GenreCardMetadata {track} bind:this={metadataComponent} />
  </div>
</div>
