import { PrismaClient } from '@prisma/client';

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

  const mappedPlaylists = playlists.map((p) => {
    return {
      id: p.id,
      name: p.name,
      score: p.score,
      color: p.playlist_items[0].tracks.albums.vibrant_color
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
