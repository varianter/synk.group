<script lang="ts">
  import { fly } from 'svelte/transition';
  import {
    ArrowRightIcon,
    BarChart2Icon,
    InfoIcon,
    LogOutIcon,
    StarIcon,
    UserPlusIcon,
    XIcon
  } from 'svelte-feather-icons';

  //TODO: Replace with real data
  const menuItems = [
    { placement: 1, genreName: 'Hip-Hop/Rap' },
    { placement: 2, genreName: 'Dance' },
    { placement: 3, genreName: 'Rock' },
    { placement: 4, genreName: 'Blues' },
    { placement: 5, genreName: 'Country' },
    { placement: 6, genreName: 'Pop' },
    { placement: 7, genreName: 'German Pop' },
    { placement: 8, genreName: 'Jazz' },
    { placement: 9, genreName: 'Soul' },
    { placement: 10, genreName: 'Reggae' }
  ];

  let duration = 200;

  let shadow = false;

  const checkScroll = (event: any) => {
    const scrollThreshold = 5;

    if (event.target.scrollTop > scrollThreshold) {
      shadow = true;
    } else {
      shadow = false;
    }
  };
  export let toggleMenu = () => {};
</script>

<button
  on:click={toggleMenu}
  in:fly={{ x: -300, duration, delay: duration }}
  out:fly={{ x: -300, duration }}
  title="Lukk meny"
  class="absolute left-[27%] top-[2.5%] z-50 w-fit rounded-xl p-3 transition hover:bg-white/10"
>
  <XIcon size="20" class="text-white" />
</button>
<div
  in:fly={{ x: -300, duration, delay: duration }}
  out:fly={{ x: -300, duration }}
  class="absolute left-5 top-5 h-[95vh] w-1/4 overflow-hidden rounded-3xl bg-brand-beige"
>
  <h2
    class="p-8 pb-6 text-3xl {shadow
      ? 'shadow-bottom'
      : ''} leading-0 font-medium transition duration-200"
  >
    Hei, Variant
  </h2>
  <div on:scroll={checkScroll} class="h-full overflow-y-scroll p-4 pt-0">
    <div class="pb-24">
      <div class="p-4 pt-0">
        <p class="mb-4 leading-6">
          Siden 2. april 2021 har gruppen vokst seg til 35 personer, og i løpet av denne tiden har
          dere totalt hørt på 11232 låter. Deres mest spilte låt er Kongen av campingplassen, som er
          blitt spilt 886 ganger. Nedenfor ser du hvilke sjangere dere hører mest på akkurat nå.
        </p>
      </div>
      <nav>
        <ol class="grid h-fit gap-y-1 border-b border-t border-black/20 py-4">
          {#each menuItems as menuItem}
            <li
              class="group flex cursor-pointer items-center justify-between gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10"
            >
              <span class="h-6 w-6">{menuItem.placement}</span>
              <span>{menuItem.genreName}</span>
              <div class="ml-auto opacity-0 group-hover:opacity-100"><ArrowRightIcon /></div>
            </li>
          {/each}
        </ol>
        <ul class="grid h-full gap-y-1 py-4">
          <li
            class="flex cursor-pointer gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10"
          >
            <StarIcon /><span>Topp 20</span>
          </li>
          <li
            class="flex cursor-pointer gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10"
          >
            <UserPlusIcon /><span>Del gruppe</span>
          </li>
          <li
            class="flex cursor-pointer gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10"
          >
            <BarChart2Icon /><span>Statistikk</span>
          </li>
          <li
            class="flex cursor-pointer gap-x-3 rounded-xl px-4 py-3 font-sans font-medium hover:bg-black/10"
          >
            <InfoIcon /><span>Om</span>
          </li>
        </ul>
        <div class="mb-4 h-[1px] w-full bg-black/20" />
        <span
          class="flex cursor-pointer gap-x-3 rounded-xl px-4 py-3 font-sans font-medium text-danger-red hover:bg-danger-red hover:text-white"
        >
          <LogOutIcon />
          <span>Forlat gruppe</span></span
        >
      </nav>
    </div>
  </div>
</div>
