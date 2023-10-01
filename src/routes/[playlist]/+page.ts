import type { PageLoadEvent } from './$types';
import type { Playlist } from '$lib/types';

export async function load({ fetch, params }: PageLoadEvent) {
  // TODO: Get group ID from current active group.
  const playlistResponse = await fetch(
    `/api/playlist?group=1f458899-0a4d-409a-840a-963e299119c4&playlist=${params.playlist}`
  );

  const playlist: Playlist = await playlistResponse.json();

  return {
    playlist
  };
}
