<script lang="ts">
  import type { PageData } from './$types';
  import PlaylistCanvas from '$lib/PlaylistCanvas.svelte';
  import GroupMetadata from '$lib/GroupMetadata.svelte';

  export let data: PageData;
</script>

<section class="grid h-full overflow-hidden">
  <GroupMetadata />
  <PlaylistCanvas playlists={data.playlists} />
</section>
