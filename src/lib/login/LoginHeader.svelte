<script lang="ts">
  import { signIn, signOut } from '@auth/sveltekit/client';
  import SpotifyIcon from '$lib/icons/SpotifyIcon.svelte';
  import { page } from '$app/stores';
  import SlideInWrapper from '$lib/SlideInWrapper.svelte';
</script>

<header class="grid items-center p-8">
  <nav class="flex justify-between">
    <div class="text-wonky flex items-center gap-x-8 text-2xl font-bold">
      <span>Synk.</span>
    </div>

    <div class="flex items-center gap-x-4 text-lg font-semibold">
      <SlideInWrapper fromRight>
        <button
          class="grid h-12 place-content-center rounded-xl px-4 py-3 hover:bg-black hover:bg-opacity-[8%]"
          let:toggleSlideIn
          on:click={toggleSlideIn}
          slot="button"
        >
          Hva er Synk?
        </button>
        <div slot="content" class="flex flex-col gap-4 p-4">
          <h1 class="text-wonky text-2xl font-bold">Hei, du!</h1>
          <p class="text-base font-normal">
            Synk gir oversikt over den mest populære musikken gruppen din hører
            på. Bare logg inn med Spotify-kontoen din, og du er i gang!
          </p>
        </div>
      </SlideInWrapper>

      {#if $page.data.session}
        <button
          class="flex h-12 items-center gap-4 rounded-xl bg-black px-4 py-3 text-white transition-transform hover:scale-105"
          on:click={() => signOut()}
        >
          <span>Logg ut</span>
        </button>
      {:else}
        <button
          class="flex h-12 items-center gap-4 rounded-xl bg-black px-4 py-3 text-white transition-transform hover:scale-105"
          on:click={() => signIn('spotify', { callbackUrl: '/' })}
        >
          <SpotifyIcon size={24} />
          <span>Logg inn</span>
        </button>
      {/if}
    </div>
  </nav>
</header>
