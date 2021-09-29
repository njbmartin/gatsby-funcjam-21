import axios from "axios";
import { SpotifyData } from "../types/spotify";

export const fetchUser = (code: string) =>
  axios.get<SpotifyData>(`/api/spotify/user`, {
    headers: {
      "x-gatsby-spotify-code": code,
    },
  });
