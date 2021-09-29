import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { parse } from "query-string";

import {
  SpotifyCurrent,
  SpotifyData,
  SpotifyRecent,
  SpotifyTracks,
  SpotifyUser,
} from "../types/spotify";
import { fetchUser } from "../requests/fetchUser";

type SpotifyContextType = {
  isLoading?: boolean;
  isError?: boolean;
  code: string;
  current?: SpotifyCurrent;
  recent?: SpotifyRecent;
  tracks?: SpotifyTracks;
  user?: SpotifyUser;
};

const LOCALSTORAGE_KEY = "spotify-code";
const localStorageData: string =
  typeof window !== "undefined"
    ? window.localStorage.getItem(LOCALSTORAGE_KEY)
    : null;

export const SpotifyContext = React.createContext<SpotifyContextType>({
  code: localStorageData,
});

export const useSpotify = (): SpotifyContextType => {
  const { code, user, tracks, current, recent } = useContext(SpotifyContext);
  return { code, user, tracks, current, recent };
};

export const SpotifyProvider: React.FC = ({ children }) => {
  const [code, setCode] = React.useState<string>(localStorageData);
  const [data, setData] = React.useState<SpotifyData>({});
  const { user, tracks, current, recent } = data;

  const { isLoading, isError, refetch } = useQuery(
    ["spotifyUser"],
    () => fetchUser(code),
    {
      enabled: !!code,
      refetchInterval: 60000,
      onError: () => {
        setCode(null);
      },
      onSuccess: ({ data }) => {
        setData(data);
      },
    }
  );

  useEffect(() => {
    if (!window) return;
    const { access_token } = parse(window.location.hash);
    access_token && setCode(access_token.toString());
  }, []);

  return (
    <SpotifyContext.Provider
      value={{
        code,
        user,
        tracks,
        current,
        recent,
        isError,
        isLoading,
      }}
    >
      {children}
    </SpotifyContext.Provider>
  );
};
