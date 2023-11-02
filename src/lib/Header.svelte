<script lang="ts">
  import UserIcon from '$lib/icons/UserIcon.svelte';
  import SlideInWrapper from '$lib/SlideInWrapper.svelte';
  import MainNavigation from '$lib/MainNavigation.svelte';
  import type { GroupInfo, Playlist } from '$lib/types';

  export let playlists: Playlist[];
  export let groupInfo: GroupInfo;

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const formattedDate = date.toLocaleDateString('nb-NO', options);
</script>

<header class="grid items-center p-8 text-3xl font-light">
  <nav class="text-wonky flex justify-between">
    <div class="flex items-center gap-x-12">
      <SlideInWrapper>
        <MainNavigation slot="content" {playlists} {groupInfo} />
      </SlideInWrapper>

      <div>
        <span class="font-bold">Synk.</span>
        <!-- Auto-formatting adds a whitespace, offset with margin. -->
        <span class="-ml-2">{groupInfo.name}</span>
      </div>
    </div>

    <div class="flex items-center gap-x-12">
      <span>{formattedDate}</span>
      <UserIcon />
    </div>
  </nav>
</header>
