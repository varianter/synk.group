<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { focusTrap } from 'svelte-focus-trap';
  import { MenuIcon, XIcon } from 'svelte-feather-icons';

  export let fromRight = false;
  let duration = 300;
  let showSlideIn = false;

  function closeOnEsc(e: KeyboardEvent) {
    if (e.key === 'Escape') showSlideIn = false;
  }
</script>

<slot name="button" toggleSlideIn={() => (showSlideIn = !showSlideIn)}>
  <button
    on:click={() => (showSlideIn = !showSlideIn)}
    class="z-10 rounded-xl p-3 transition hover:bg-black/8"
  >
    <MenuIcon size="20" />
  </button>
</slot>

<!-- Close on Escape. -->
<svelte:body on:keydown={closeOnEsc} />

{#if showSlideIn}
  <div
    on:mousedown={() => (showSlideIn = false)}
    transition:fade={{ duration }}
    class="absolute left-0 top-0 z-40 h-full w-full bg-black opacity-60"
  />
  <div
    transition:fly={{ x: fromRight ? '100%' : '-100%', duration, opacity: 100 }}
    use:focusTrap
    class="absolute top-5 z-50 flex h-[calc(100vh-2.5rem)] items-start gap-4"
    class:left-5={!fromRight}
    class:right-5={fromRight}
    class:flex-row-reverse={fromRight}
  >
    <div
      class="flex h-full w-80 flex-col overflow-hidden rounded-3xl bg-brand-beige"
    >
      <slot name="content">No content.</slot>
    </div>
    <button
      on:click={() => (showSlideIn = false)}
      title="Lukk meny"
      class="z-50 w-fit overflow-hidden rounded-xl p-3 transition hover:bg-white/10 focus:bg-white/10"
    >
      <XIcon size="20" class="text-white" />
    </button>
  </div>
{/if}
