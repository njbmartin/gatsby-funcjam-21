export type SpotifyUser = {
  country: string;
  display_name: string;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  id: string;
  images: [
    {
      url: string;
    }
  ];
  product: string;
};

type SpotifyArtist = {
  name: string;
  uri: string;
};

type SpotifyArtwork = {
  height: number;
  url: string;
  width: number;
};

type SpotifyTrack = {
  album: {
    artists: SpotifyArtist[];
    images: SpotifyArtwork[];
    name: string;
    uri: string;
  };
  artists: SpotifyArtist[];
  duration_ms: number;
  name: string;
  preview_url: string;
  uri: string;
};

export type SpotifyTracks = {
  items: SpotifyTrack[];
};

export type SpotifyCurrent = {
  timestamp?: number;
  progress_ms?: number;
  is_playing: boolean;
  item?: SpotifyTrack;
};

type SpotifyRecentTrack = {
  track: SpotifyTrack;
  played_at: string;
};

export type SpotifyRecent = {
  items: SpotifyRecentTrack[];
};

export type SpotifyData = {
  current?: SpotifyCurrent;
  recent?: SpotifyRecent;
  tracks?: SpotifyTracks;
  user?: SpotifyUser;
};
