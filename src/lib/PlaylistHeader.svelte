<script lang="ts">
  import { ArrowLeftIcon } from 'svelte-feather-icons';
  export let playlistName: string;

  const date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };
  const formattedDate = date.toLocaleDateString('nb-NO', options);
</script>

<header class="text-wonky-normal grid items-center p-8 pb-4">
  <nav class="flex justify-between">
    <div class="flex items-center gap-x-8">
      <a class="rounded-xl p-3 transition hover:bg-white/10" href="/">
        <ArrowLeftIcon />
      </a>
      <div>{playlistName}</div>
    </div>

    <div class="text-wonky-normal-300 flex items-center gap-x-12 text-white">
      <span>{formattedDate}</span>
    </div>
  </nav>
</header>
