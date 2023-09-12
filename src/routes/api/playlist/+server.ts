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
      score: true
      // TODO: Need color.
    },
    orderBy: {
      score: 'desc'
    },
    take: 11
  });

  return new Response(JSON.stringify(playlists));
}
