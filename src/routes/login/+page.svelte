<script lang="ts">
  import LoginHeader from '$lib/login/LoginHeader.svelte';
  import generateStickers from '$lib/utils/generate-stickers';
  import random from '$lib/utils/random';
  import { fly } from 'svelte/transition';
  import { onMount } from 'svelte';

  const stickers = generateStickers();

  let counter = 0;
  let currentTimeout: number | undefined;

  function resetCounter() {
    clearTimeout(currentTimeout);
    counter = 0;
    currentTimeout = setTimeout(incrementCounter, 4000);
  }

  function incrementCounter() {
    if (counter < stickers.length) {
      const timeout = random(0.5, 1.5, 0.1);

      currentTimeout = setTimeout(incrementCounter, timeout * 1000);
    }
    counter += 1;
  }

  currentTimeout = setTimeout(incrementCounter, 4000);

  let ready = false;
  onMount(() => (ready = true));
</script>

<div
  class="flex h-full flex-col overflow-hidden bg-brand-beige"
  on:click={resetCounter}
  on:keydown={resetCounter}
>
  <LoginHeader />

  <main class="relative grid h-full w-full place-content-center p-8 pb-[9rem]">
    {#if ready}
      <h1
        in:fly={{
          delay: 0,
          duration: 350,
          y: 20
        }}
        class="text-wonky-jumbo text-center"
      >
        Vær sammen om musikken
      </h1>
      <h2
        in:fly={{
          delay: 200,
          duration: 350,
          y: 20
        }}
        class="mt-8 text-center text-black/[0.6]"
      >
        Opprett eller bli med i en gruppe i dag. Og ja, du kan bli med i flere
        grupper!
      </h2>
    {/if}

    {#each stickers as { component, props }, index}
      {#if index < counter}
        <svelte:component this={component} {...props} />
      {/if}
    {/each}
  </main>
</div>
