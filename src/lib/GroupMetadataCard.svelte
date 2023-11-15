<script lang="ts">
  export let label: string;
  export let value: string;
</script>

<div class="flex min-w-min flex-1 flex-col gap-2 rounded-xl bg-black/4 p-4">
  <p class="text-body-small whitespace-nowrap text-black/[0.6]">
    {label}
  </p>
  <p class="text-wonky-small whitespace-nowrap">{value}</p>
</div>
