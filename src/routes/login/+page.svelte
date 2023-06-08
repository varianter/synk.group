<script lang="ts">
  import SynkLargeIcon from '$lib/icons/SynkLargeIcon.svelte';
  import LoginHeader from '$lib/login/LoginHeader.svelte';
  import generateStickers from '$lib/utils/generateStickers';
  import random from '$lib/utils/random';

  const stickers = generateStickers();

  let counter = 0;
  let currentTimeout: number | undefined;

  function resetCounter() {
    clearTimeout(currentTimeout);
    counter = 0;
    currentTimeout = setTimeout(incrementCounter, 12000);
  }

  function incrementCounter() {
    if (counter < stickers.length) {
      const timeout = random(1, 2, 0.1);

      currentTimeout = setTimeout(incrementCounter, timeout * 1000);
    }
    counter += 1;
  }

  currentTimeout = setTimeout(incrementCounter, 12000);
</script>

<div
  class="flex h-full flex-col overflow-hidden bg-brand-beige"
  on:click={resetCounter}
  on:keydown={resetCounter}
>
  <LoginHeader />

  <main class="relative grid h-full w-full place-content-center p-8">
    <h1 class="text-wonky text-center text-6xl font-bold">Vær sammen om musikken</h1>
    <h2 class="mt-8 text-center">
      Opprett eller bli med i en gruppe i dag. Og ja, du kan bli med i flere grupper!
    </h2>

    {#each stickers as { component, props }, index}
      {#if index < counter}
        <svelte:component this={component} {...props} />
      {/if}
    {/each}
  </main>
</div>
