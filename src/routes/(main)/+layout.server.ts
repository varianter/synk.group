import type { LayoutServerLoadEvent } from './$types';

export async function load({ fetch }: LayoutServerLoadEvent) {
  // TODO: Get group ID from current active group.
  const playlistsResponse = await fetch(
    '/api/playlists?group=1f458899-0a4d-409a-840a-963e299119c4'
  );

  const playlists = await playlistsResponse.json();

  return {
    playlists
  };
}
