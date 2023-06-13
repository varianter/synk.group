import { SvelteKitAuth } from '@auth/sveltekit';
import Spotify from '@auth/core/providers/spotify';
import {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  NODE_ENV
} from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

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
        clientSecret: SPOTIFY_CLIENT_SECRET
      })
    ],
    debug: NODE_ENV !== 'production'
  }),
  authorization
);
