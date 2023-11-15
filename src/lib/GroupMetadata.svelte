<script lang="ts">
  import GroupMetadataCard from '$lib/GroupMetadataCard.svelte';
</script>

<div class="hide-scrollbar z-10 flex gap-4 self-start overflow-x-auto p-8 pt-0">
  <GroupMetadataCard label="Mest spilte sjanger" value="Hip-Hop/Rap" />
  <GroupMetadataCard label="Mest spilte sjanger" value="Hip-Hop/Rap" />
  <GroupMetadataCard label="Mest spilte sjanger" value="Hip-Hop/Rap" />
  <GroupMetadataCard label="Mest spilte" value="Hip" />
  <GroupMetadataCard label="Mest spilte sjanger" value="Hip-Hop/Rap" />
  <GroupMetadataCard label="Mest spilte sjanger" value="Hip-Hop/Rap" />
</div>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
