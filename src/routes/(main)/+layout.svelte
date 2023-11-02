<script lang="ts">
  import Header from '$lib/Header.svelte';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<svelte:head>
  <title>Synk.{data.groupInfo.name}</title>
</svelte:head>

<div class="text-serif relative flex h-full flex-col bg-brand-beige">
  <Header playlists={data.playlists} groupInfo={data.groupInfo} />

  <main class="grow-1 h-full">
    <slot />
  </main>
</div>
