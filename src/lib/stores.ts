import { writable } from 'svelte/store';

export const currentPreview = writable<HTMLAudioElement | null>(null);
