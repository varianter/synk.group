<script>
  const balls = [
    { genreName: 'Rock', color: 'bg-red-500', dimensions: 'h-24 w-24' },
    { genreName: 'Rap', color: 'bg-blue-500', dimensions: 'h-80 w-80' },
    { genreName: 'Pop', color: 'bg-green-500', dimensions: 'h-24 w-24' },
    { genreName: 'Country', color: 'bg-slate-500', dimensions: 'h-40 w-40' },
    { genreName: 'Alternative', color: 'bg-yellow-500', dimensions: 'h-64 w-64' }
  ];
</script>

<section class="grid h-full items-end overflow-hidden">
  <div class="flex h-full w-full items-end">
    {#each balls as ball}
      <div class="{ball.color} {ball.dimensions} grid place-items-center rounded-full">
        {ball.genreName}
      </div>
    {/each}
  </div>
</section>
