<script lang="ts">
  import { BarChart2Icon } from 'svelte-feather-icons';
  import CircleSeparator from '$lib/icons/CircleSeparator.svelte';
  import type { Track } from '$lib/types';
  import { tweened } from 'svelte/motion';

  export let track: Track;

  let parentWidth: number;
  let metadataWidth: number;

  const transformTween = tweened(0, {
    duration: 3000
  });

  // Used by the parent component on mouseEnter.
  export function startScroll() {
    const transform = metadataWidth - parentWidth;
    if (transform <= 0) return;

    setTimeout(async () => {
      await transformTween.set(transform);
      setTimeout(async () => {
        await transformTween.set(0);
      }, 500);
    }, 1500);
  }

  // Used by the parent component on mouseLeave.
  export function stopScroll() {
    // Delay the reset of the transform tween to accommodate the animation on
    // hover.
    setTimeout(() => {
      transformTween.set(0, { duration: 0 });
    }, 250);
  }

  function prettyPrintDuration(durationInMs: number): string {
    const durationInSeconds = Math.floor(durationInMs / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = `${durationInSeconds % 60}`.padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
</script>

<div
  style="background-color: {track.color}"
  class="absolute bottom-0 left-0 right-0 z-0 overflow-hidden rounded-b-xl"
  bind:clientWidth={parentWidth}
>
  <!-- Overlay to darken the background color. -->
  <div class="absolute bottom-0 left-0 right-0 top-0 bg-black/[0.16]" />

  <div
    class="flex w-[fit-content] items-center gap-1.5 whitespace-nowrap p-4 pt-8 font-sans text-lg font-normal"
    bind:clientWidth={metadataWidth}
    style="transform: translateX(-{$transformTween}px)"
  >
    <BarChart2Icon />

    <span>{track.numberOfPlays} avspillinger</span>

    <CircleSeparator />

    <span class="text-white text-opacity-70">
      Utgitt i {track.releaseDate?.substring(0, 4)}
    </span>

    <CircleSeparator />

    <span class="text-white text-opacity-70">
      {prettyPrintDuration(track.duration)}
    </span>
  </div>
</div>