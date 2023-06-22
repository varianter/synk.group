import { SvelteKitAuth } from '@auth/sveltekit';
import Spotify from '@auth/core/providers/spotify';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  NODE_ENV
} from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { PrismaClient } from '@prisma/client';

const authorization: Handle = async ({ event, resolve }) => {
  if (!event.url.pathname.startsWith('/login')) {
    const session = await event.locals.getSession();
    if (!session) {
      throw redirect(303, '/login');
    }
  }

  // If the request is still here, just proceed as normally
  return resolve(event);
};

export const handle: Handle = sequence(
  SvelteKitAuth({
    providers: [
      // TODO: Fix type issues
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Spotify({
        clientId: SPOTIFY_CLIENT_ID,
        clientSecret: SPOTIFY_CLIENT_SECRET,
        authorization:
          'https://accounts.spotify.com/authorize?scope=user-read-email user-read-private user-read-recently-played'
      })
    ],
    debug: NODE_ENV !== 'production',
    callbacks: {
      async signIn({ user, account, profile, email, credentials }) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { access_token, refresh_token } = account;

        const prisma = new PrismaClient();

        const createdUser = await prisma.users.upsert({
          where: { id: user.id },
          create: {
            id: user.id,
            lastsync: null
          },
          update: {},
          select: {
            id: true
          }
        });

        await prisma.tokens.create({
          data: {
            accesstoken: access_token,
            refreshtoken: refresh_token,
            expiresat: getExpiresAt(),
            userid: createdUser.id
          }
        });

        return true;
      }
    }
  }),
  authorization
);

function getExpiresAt() {
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + 3600);
  return expiresAt;
}
