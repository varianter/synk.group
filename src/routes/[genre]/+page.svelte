<script lang="ts">
  import GenreCard from '$lib/GenreCard.svelte';
  import type { Track } from '$lib/types';

  const tracks: Track[] = [
    {
      title: 'heading_home_demo2016.wav',
      artist: {
        name: 'Baklengs Salto',
        image: 'https://placehold.co/24x24'
      },
      year: '2022',
      duration: 181,
      genre: 'Pop',
      preview:
        'https://p.scdn.co/mp3-preview/cf87bb6da889e95475015b383029008e87c40aea?cid=53f102596b924c0ab9e1426f2612e41a',
      coverart:
        'https://i.scdn.co/image/ab67616d0000b273bec8736363f84c1fcb426ee1',
      color: 'rgb(22 163 74)'
    },
    {
      title: 'Tennis',
      artist: {
        name: 'Baklengs Salto - ft. Sidelengs Salto, ft. Oppned Salto, ft. Hitogdit Salto',
        image: 'https://placehold.co/24x24'
      },
      year: '2022',
      duration: 181,
      genre: 'Pop',
      preview:
        'https://p.scdn.co/mp3-preview/cf87bb6da889e95475015b383029008e87c40aea?cid=53f102596b924c0ab9e1426f2612e41a',
      coverart:
        'https://i.scdn.co/image/ab67616d0000b2738caec43ddf3b121ae5a5e5ed',
      color: 'rgb(22 163 74)'
    },
    {
      title: 'Tennis',
      artist: {
        name: 'Baklengs Salto',
        image: 'https://placehold.co/24x24'
      },
      year: '2022',
      duration: 181,
      genre: 'Pop',
      preview:
        'https://p.scdn.co/mp3-preview/cf87bb6da889e95475015b383029008e87c40aea?cid=53f102596b924c0ab9e1426f2612e41a',
      coverart:
        'https://i.scdn.co/image/ab67616d0000b273a1377cb192da55e7fa832932',
      color: 'rgb(22 163 74)'
    },
    {
      title: 'Tennis',
      artist: {
        name: 'Baklengs Salto',
        image: 'https://placehold.co/24x24'
      },
      year: '2022',
      duration: 181,
      genre: 'Pop',
      preview:
        'https://p.scdn.co/mp3-preview/cf87bb6da889e95475015b383029008e87c40aea?cid=53f102596b924c0ab9e1426f2612e41a',
      coverart:
        'https://i.scdn.co/image/ab67616d0000b273da0180cbadf671b8f0838f15',
      color: 'rgb(22 163 74)'
    },
    {
      title: 'Tennis',
      artist: {
        name: 'Baklengs Salto',
        image: 'https://placehold.co/24x24'
      },
      year: '2022',
      duration: 181,
      genre: 'Pop',
      preview:
        'https://p.scdn.co/mp3-preview/cf87bb6da889e95475015b383029008e87c40aea?cid=53f102596b924c0ab9e1426f2612e41a',
      coverart:
        'https://i.scdn.co/image/ab67616d0000b2730c3c1807912df2f106a2e24e',
      color: 'rgb(22 163 74)'
    }
  ];
</script>

<main class="flex h-full gap-x-8 overflow-x-auto p-8 pt-4">
  {#each tracks as track, index}
    <GenreCard {track} {index} />
  {/each}
</main>
