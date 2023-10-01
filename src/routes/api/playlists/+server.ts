import { PrismaClient } from '@prisma/client';
import type { PlaylistWithoutTracks } from '$lib/types';
import { defaultColor } from '$lib/utils/palette';
import _ from 'lodash';

const prisma = new PrismaClient();

export async function GET({ url }: Request) {
  const searchParams = new URL(url).searchParams;
  const groupId = searchParams.get('group');

  const playlists = await prisma.playlists.findMany({
    where: {
      is_current_top_list: true,
      group_id: groupId
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
              albums: {
                select: {
                  vibrant_color: true
                }
              }
            }
          }
        },
        orderBy: {
          score: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      score: 'desc'
    },
    take: 11
  });

  const mappedPlaylists: PlaylistWithoutTracks[] = playlists.map((p) => {
    return {
      id: p.id,
      name: p.name,
      score: p.score,
      color:
        _.first(p.playlist_items)?.tracks.albums.vibrant_color ?? defaultColor
    };
  });

  return new Response(JSON.stringify(mappedPlaylists));
}

// To make BigInt work with JSON.stringify
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString());
  return int ?? this.toString();
};
