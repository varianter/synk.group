<script lang="ts">
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

<header class="text-wonky-normal grid items-center p-8 font-light">
  <nav class="text-wonky flex justify-between">
    <div class="flex items-center gap-x-8">
      <SlideInWrapper>
        <MainNavigation slot="content" {playlists} {groupInfo} />
      </SlideInWrapper>

      <div>
        <span class="font-bold">Synk.</span>
        <!-- Auto-formatting adds a whitespace, offset with margin. -->
        <span class="text-wonky-normal-300 -ml-2">{groupInfo.name}</span>
      </div>
    </div>

    <div class="flex items-center gap-x-8">
      <span class="text-wonky-normal-300">{formattedDate}</span>
      <SlideInWrapper fromRight>
        <button
          class="z-10 rounded-xl p-3 transition hover:bg-black/8"
          let:toggleSlideIn
          on:click={toggleSlideIn}
          slot="button"
        >
          <span class="font-bold">M</span>
        </button>
      </SlideInWrapper>
    </div>
  </nav>
</header>
