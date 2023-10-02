import { PrismaClient } from '@prisma/client';
import _ from 'lodash';
import type { GroupInfo, Playlist } from '$lib/types';
import { defaultColor } from '$lib/utils/palette';

const prisma = new PrismaClient();

export async function GET({ url }: Request) {
  const searchParams = new URL(url).searchParams;
  const groupId = searchParams.get('id');

  if (!groupId) {
    return new Response(
      JSON.stringify({ error: true, message: 'Missing group  id' })
    );
  }

  const group = await prisma.groups.findFirst({
    where: {
      id: groupId
    },
    select: {
      id: true,
      name: true,
      creation_time: true,
      group_members: {
        select: {
          user_id: true,
          entered_at: true,
          left_at: true
        }
      },
      _count: {
        select: {
          group_members: true
        }
      }
    }
  });

  if (!group) {
    return new Response(
      JSON.stringify({ error: true, message: 'Group not found' })
    );
  }

  let playedTracks = 0;

  for (const member of group.group_members) {
    playedTracks += await prisma.played_tracks.count({
      where: {
        user_id: member.user_id,
        played_at: {
          gte: member.entered_at,
          lte: member.left_at ?? undefined
        }
      }
    });
  }

  // TODO: Figure out how to get favorite track.
  const favoriteTrack = null;

  const mappedGroupInfo: GroupInfo | null = {
    id: group.id,
    name: group.name,
    numberOfMembers: group._count.group_members,
    numberOfTracks: playedTracks,
    creationDate: group.creation_time?.toISOString(),
    favoriteTrack
  };

  return new Response(JSON.stringify(mappedGroupInfo));
}
