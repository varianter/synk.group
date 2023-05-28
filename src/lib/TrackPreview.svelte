<script lang="ts">
  import { onMount } from 'svelte';
  import { PauseIcon, PlayIcon } from 'svelte-feather-icons';
  import { writable } from 'svelte/store';
  import { fade } from 'svelte/transition';
  import type { Track } from './types';

  export let track: Track;
  export let index: number;

  const hoveringPreview = writable(false);

  $: console.log($hoveringPreview);

  let showNumber = false;

  onMount(() => {
    showNumber = true;
  });

  let audio: HTMLAudioElement;

  let currentTime = 0;
  let duration = 0;

  $: leftRotation = calculateLeftRotation(currentTime / duration);
  $: rightRotation = calculateRightRotation(currentTime / duration);

  function calculateLeftRotation(progress: number) {
    if (progress === 1) return '0deg';
    return progress > 0.5 ? (progress - 0.5) * 2 * 180 + 'deg' : '0deg';
  }
  function calculateRightRotation(progress: number) {
    if (progress === 1) return '0deg';
    return progress < 0.5 ? progress * 2 * 180 + 'deg' : '180deg';
  }
  function randomPercent(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min + '%';
  }
</script>

{#if showNumber}
  <div transition:fade class="grow-1 h-full w-full">
    <div
      style="top: {randomPercent(10, 80)}; left: {randomPercent(
        0,
        60
      )}; background-color: {track.color}"
      class="relative grid h-40 w-40 place-content-center rounded-full text-5xl transition-opacity hover:cursor-pointer"
      on:mouseenter={() => {
        $hoveringPreview = true;
      }}
      on:mouseleave={() => {
        $hoveringPreview = false;
      }}
      on:click={() => {
        if (audio.paused) {
          $hoveringPreview = false;
          audio.play();
        } else {
          $hoveringPreview = true;
          audio.pause();
        }
      }}
      on:keypress={() => {
        // TODO
      }}
    >
      <audio bind:this={audio} bind:currentTime bind:duration>
        <source src={track.preview} type="audio/mpeg" />
      </audio>

      <div
        class="progress"
        style="--left-rotation: {leftRotation}; --right-rotation: {rightRotation}"
      >
        <span class="progress-left">
          <span class="progress-bar" />
        </span>
        <span class="progress-right">
          <span class="progress-bar" />
        </span>
        <div class="progress-value">
          <div class="text-wonky">
            {#if !audio?.paused}
              <PauseIcon size="40" class="fill-white" />
            {:else if $hoveringPreview}
              <PlayIcon size="40" class="ml-1 fill-white" />
            {:else}
              {index + 1}
            {/if}
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .progress {
    width: 100%;
    height: 100%;
    line-height: 100%;
    background: none;
    margin: 0 auto;
    box-shadow: none;
  }
  .progress:after {
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 0.5rem solid transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
  .progress > span {
    width: 50%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 1;
  }
  .progress .progress-left {
    left: 0;
  }
  .progress .progress-bar {
    width: 100%;
    height: 100%;
    background: none;
    border-width: 0.5rem;
    border-style: solid;
    position: absolute;
    top: 0;
    border-color: rgba(255, 255, 255, 0.5);
  }
  .progress .progress-left .progress-bar {
    left: 100%;
    border-top-right-radius: 9999px;
    border-bottom-right-radius: 9999px;
    border-left: 0;
    transform-origin: center left;
  }
  .progress .progress-right {
    right: 0;
  }
  .progress .progress-right .progress-bar {
    left: -100%;
    border-top-left-radius: 9999px;
    border-bottom-left-radius: 9999px;
    border-right: 0;
    transform-origin: center right;
  }

  .progress .progress-right .progress-bar {
    transform: rotate(var(--right-rotation, 0deg));
  }
  .progress .progress-left .progress-bar {
    transform: rotate(var(--left-rotation, 0deg));
  }
</style>
