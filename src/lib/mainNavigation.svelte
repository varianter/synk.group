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
  class="hover:bg-white/10 p-3 rounded-xl transition z-50 w-fit absolute top-[2.5%] left-[27%]"
>
  <XIcon size="20" class="text-white" />
</button>
<div
  in:fly={{ x: -300, duration, delay: duration }}
  out:fly={{ x: -300, duration }}
  class="absolute top-5 left-5 bg-brand-beige h-[95vh] w-1/4 rounded-3xl overflow-hidden"
>
  <h2
    class="p-8 pb-6 text-3xl {shadow
      ? 'shadow-bottom'
      : ''} font-medium leading-0 transition duration-200"
  >
    Hei, Variant
  </h2>
  <div on:scroll={checkScroll} class="p-4 pt-0 overflow-y-scroll h-full">
    <div class="pb-24">
      <div class="p-4 pt-0">
        <p class="mb-4 leading-6">
          Siden 2. april 2021 har gruppen vokst seg til 35 personer, og i løpet av denne tiden har
          dere totalt hørt på 11232 låter. Deres mest spilte låt er Kongen av campingplassen, som er
          blitt spilt 886 ganger. Nedenfor ser du hvilke sjangere dere hører mest på akkurat nå.
        </p>
      </div>
      <nav>
        <ol class="border-t border-b border-black/20 grid gap-y-1 h-fit py-4">
          {#each menuItems as menuItem}
            <li
              class="flex items-center justify-between gap-x-3 font-medium font-sans rounded-xl hover:bg-black/10 px-4 py-3 group cursor-pointer"
            >
              <span class="h-6 w-6">{menuItem.placement}</span>
              <span>{menuItem.genreName}</span>
              <div class="opacity-0 group-hover:opacity-100 ml-auto"><ArrowRightIcon /></div>
            </li>
          {/each}
        </ol>
        <ul class="grid gap-y-1 h-full py-4">
          <li
            class="flex gap-x-3 font-sans font-medium rounded-xl hover:bg-black/10 px-4 py-3 cursor-pointer"
          >
            <StarIcon /><span>Topp 20</span>
          </li>
          <li
            class="flex gap-x-3 font-sans font-medium rounded-xl hover:bg-black/10 px-4 py-3 cursor-pointer"
          >
            <UserPlusIcon /><span>Del gruppe</span>
          </li>
          <li
            class="flex gap-x-3 font-sans font-medium rounded-xl hover:bg-black/10 px-4 py-3 cursor-pointer"
          >
            <BarChart2Icon /><span>Statistikk</span>
          </li>
          <li
            class="flex gap-x-3 font-sans font-medium rounded-xl hover:bg-black/10 px-4 py-3 cursor-pointer"
          >
            <InfoIcon /><span>Om</span>
          </li>
        </ul>
        <div class="h-[1px] w-full bg-black/20 mb-4" />
        <span
          class="flex gap-x-3 text-danger-red font-sans font-medium rounded-xl hover:bg-danger-red hover:text-white px-4 py-3 cursor-pointer"
        >
          <LogOutIcon />
          <span>Forlat gruppe</span></span
        >
      </nav>
    </div>
  </div>
</div>
