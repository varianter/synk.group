<script lang="ts">
  import type { PageData } from './$types';
  import PlaylistCanvas from '$lib/PlaylistCanvas.svelte';

  export let data: PageData;
</script>

<section class="grid h-full overflow-hidden">
  <PlaylistCanvas playlists={data.playlists} />
</section>
