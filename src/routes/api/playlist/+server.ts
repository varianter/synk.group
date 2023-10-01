import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import type { Playlist } from '$lib/types';
import { defaultColor } from '$lib/utils/palette';

const prisma = new PrismaClient();

export async function GET({ url }: Request) {
  const searchParams = new URL(url).searchParams;
  const groupId = searchParams.get('group');
  const playlistId = searchParams.get('playlist');

  if (!groupId || !playlistId) {
    return new Response(
      JSON.stringify({ error: true, message: 'Missing group or playlist id' })
    );
  }

  const playlist = await prisma.playlists.findFirst({
    where: {
      group_id: groupId,
      id: playlistId
    },
    select: {
      id: true,
      name: true,
      score: true,
      playlist_items: {
        select: {
          number_of_plays: true,
          tracks: {
            select: {
              id: true,
              name: true,
              duration: true,
              genre: true,
              preview_url: true,
              track_artists: {
                select: {
                  artist_order: true,
                  artists: {
                    select: {
                      name: true,
                      id: true,
                      image_url: true
                    }
                  }
                }
              },
              albums: {
                select: {
                  vibrant_color: true,
                  image_url: true,
                  release_date: true
                }
              }
            }
          }
        },
        orderBy: {
          score: 'desc'
        }
      }
    },
    orderBy: {
      score: 'desc'
    }
  });

  const mappedPlaylist: Playlist | null = playlist
    ? {
        id: playlist.id,
        name: playlist.name,
        score: playlist.score,
        color:
          _.first(playlist.playlist_items)?.tracks.albums.vibrant_color ??
          defaultColor,
        tracks: playlist.playlist_items.map(({ tracks, number_of_plays }) => ({
          id: tracks.id,
          title: tracks.name,
          duration: Number(tracks.duration),
          genre: tracks.genre,
          numberOfPlays: Number(number_of_plays),
          color: tracks.albums.vibrant_color,
          coverart: tracks.albums.image_url,
          preview: tracks.preview_url,
          releaseDate: tracks.albums.release_date,
          artists: tracks.track_artists.map(({ artists, artist_order }) => ({
            id: artists.id,
            name: artists.name,
            order: Number(artist_order),
            image: artists.image_url
          }))
        }))
      }
    : null;

  return new Response(JSON.stringify(mappedPlaylist));
}
