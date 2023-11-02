import { writable } from 'svelte/store';
import { defaultColor } from '$lib/utils/palette';

export const showMenu = writable(false);

export const originalPlaylistBackgroundColor = writable(defaultColor);
export const playlistBackgroundColor = writable(defaultColor);
export const playlistBackgroundTimeout = writable<number | null>(null);
