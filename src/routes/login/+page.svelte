<script lang="ts">
  import SynkLargeIcon from '$lib/icons/SynkLargeIcon.svelte';
  import LoginHeader from '$lib/login/LoginHeader.svelte';
  import generateStickers from '$lib/utils/generateStickers';
  import random from '$lib/utils/random';

  const stickers = generateStickers();

  let counter = 0;

  function incrementCounter() {
    if (counter < stickers.length) {
      const timeout = random(1, 3);
      setTimeout(incrementCounter, timeout * 1000);
    }
    counter += 1;
  }

  setTimeout(incrementCounter, 2000);
</script>

<div class="flex h-full flex-col overflow-hidden bg-brand-beige">
  <LoginHeader />

  <main class="relative grid h-full w-full place-content-center">
    <SynkLargeIcon />

    {#each stickers as { component, props }, index}
      {#if index < counter}
        <svelte:component this={component} {...props} />
      {/if}
    {/each}
  </main>
</div>
