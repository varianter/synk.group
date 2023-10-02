<script lang="ts">
  import {
    ArrowRightIcon,
    BarChart2Icon,
    InfoIcon,
    LogOutIcon,
    StarIcon,
    UserPlusIcon
  } from 'svelte-feather-icons';
  import { shadowOnScroll } from '$lib/utils/directives';
  import type { GroupInfo, Playlist } from '$lib/types';

  export let playlists: Playlist[];
  export let groupInfo: GroupInfo;

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString('nb-NO', options);
  }
</script>

<h2 class="leading-0 p-8 pb-6 text-3xl font-medium">Hei, {groupInfo.name}</h2>
<div
  use:shadowOnScroll
  class="overflow-y-auto scroll-smooth p-4 pt-0 text-base"
>
  <div>
    <div class="p-4 pt-0">
      <p class="mb-3 leading-6">
        <span>
          Siden {formatDate(groupInfo.creationDate)} har gruppen vokst seg til {groupInfo.numberOfMembers}
          personer, og i løpet av denne tiden har dere totalt hørt på {groupInfo.numberOfTracks}
          låter.
        </span>
        {#if groupInfo.favoriteTrack}
          <span>
            Deres mest spilte låt er {groupInfo.favoriteTrack.title}, som er
            blitt spilt {groupInfo.favoriteTrack.numberOfPlays} ganger.
          </span>
        {/if}
        <span>
          Nedenfor ser du hvilke sjangere dere hører mest på akkurat nå.
        </span>
      </p>
    </div>
    <nav>
      <ol class="grid h-fit gap-y-1 border-b border-t border-black/20 py-4">
        {#each playlists as playlist, index}
          <li>
            <a
              href="/{playlist.id}"
              class="group flex w-full cursor-pointer items-center justify-between gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10 focus:bg-black/10"
            >
              <span class="h-6 w-6">{index + 1}</span>
              <span>{playlist.name}</span>
              <ArrowRightIcon
                class="ml-auto opacity-0 group-focus-within:opacity-100 group-hover:opacity-100"
              />
            </a>
          </li>
        {/each}
      </ol>

      <ul class="grid h-full gap-y-1 py-4">
        <li>
          <a
            href="/"
            class="pointer-events-none flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <StarIcon />
            <span>Topp 20</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="pointer-events-none flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <UserPlusIcon />
            <span>Del gruppe</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="pointer-events-none flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <BarChart2Icon />
            <span>Statistikk</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="pointer-events-none flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <InfoIcon />
            <span>Om</span>
          </a>
        </li>
      </ul>

      <div class="mb-4 h-[1px] w-full bg-black/20" />

      <button
        class="flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-danger-red/50"
      >
        <LogOutIcon />
        <span>Forlat gruppe</span>
      </button>
    </nav>
  </div>
</div>
