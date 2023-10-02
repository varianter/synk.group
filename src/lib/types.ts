export type Track = {
  title: string;
  artists: {
    id: string;
    name: string;
    image: string | null;
    order: number;
  }[];
  releaseDate: string | null;
  duration: number;
  genre: string | null;
  preview: string | null;
  coverart?: string;
  color: string | null;
  numberOfPlays: number;
};

export type Playlist = {
  id: string;
  name: string;
  score: number;
  color: string;
  tracks: Track[];
};

export type PlaylistWithoutTracks = Omit<Playlist, 'tracks'>;

export type GroupInfo = {
  id: string;
  name: string;
  numberOfMembers: number;
  numberOfTracks: number;
  favoriteTrack: {
    title: string;
    numberOfPlays: number;
  } | null;
  creationDate: string | undefined;
};
