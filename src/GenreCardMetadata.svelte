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

  function prettyPrintDuration(duration: number): string {
    const minutes = Math.floor(duration / 60);
    const seconds = `${duration % 60}`.padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
</script>

<div
  class="absolute bottom-0 left-0 right-0 z-0 overflow-hidden rounded-b-xl bg-green-800"
  bind:clientWidth={parentWidth}
>
  <div
    class="flex w-[fit-content] items-center gap-1.5 whitespace-nowrap p-4 pt-8 font-sans text-lg font-normal"
    bind:clientWidth={metadataWidth}
    style="transform: translateX(-{$transformTween}px)"
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
    <span>Hallo i luken i luken i luken</span>
  </div>
</div>
