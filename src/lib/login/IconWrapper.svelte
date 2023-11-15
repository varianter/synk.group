<script lang="ts">
  import random from '$lib/utils/random';
  import { stickerColors } from '$lib/utils/palette';
  import { onMount, type ComponentType } from 'svelte';

  export let color = '';

  export let Icon: ComponentType;
  export let top: number;
  export let left: number;

  let rotation: number;
  let colorIndex: number;
  let show = false;

  onMount(() => {
    rotation = random(-10, 10);
    colorIndex = random(0, stickerColors.length - 1);

    show = true;
  });
</script>

{#if show}
  <div
    class="absolute"
    style="transform: rotate({rotation}deg); top: {top}%; left: {left}%"
  >
    <svelte:component
      this={Icon}
      color={color.length ? color : stickerColors[colorIndex]}
    />
  </div>
{/if}
