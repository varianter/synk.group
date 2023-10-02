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
  import type { Playlist } from '$lib/types';

  export let playlists: Playlist[];
</script>

<h2 class="leading-0 p-8 pb-6 text-3xl font-medium">Hei, Norge</h2>
<div
  use:shadowOnScroll
  class="overflow-y-auto scroll-smooth p-4 pt-0 text-base"
>
  <div>
    <div class="p-4 pt-0">
      <p class="mb-4 leading-6">
        Siden 2. april 2021 har gruppen vokst seg til 35 personer, og i løpet av
        denne tiden har dere totalt hørt på 11232 låter. Deres mest spilte låt
        er Kongen av campingplassen, som er blitt spilt 886 ganger. Nedenfor ser
        du hvilke sjangere dere hører mest på akkurat nå.
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
            class="flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <StarIcon />
            <span>Topp 20</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <UserPlusIcon />
            <span>Del gruppe</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
          >
            <BarChart2Icon />
            <span>Statistikk</span>
          </a>
        </li>
        <li>
          <a
            href="/"
            class="flex w-full cursor-not-allowed gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-gray-400"
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
