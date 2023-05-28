<script lang="ts">
  import { ArrowLeftIcon } from 'svelte-feather-icons';
  export let genre: string;

  const date = new Date();
  const options: any = { weekday: 'long', day: 'numeric', month: 'long' };
  const formattedDate = date.toLocaleDateString('nb-NO', options);
</script>

<header class="text-wonky grid items-center p-8 pb-4 text-3xl">
  <nav class="flex justify-between">
    <div class="flex items-center gap-x-8">
      <button class="rounded-xl p-3 transition hover:bg-black/10">
        <ArrowLeftIcon size="20" />
      </button>
      <div>{genre}</div>
    </div>

    <div class="text flex items-center gap-x-12 font-light text-white">
      <span>{formattedDate}</span>
    </div>
  </nav>
</header>
