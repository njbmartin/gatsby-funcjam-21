import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";
import axios from "axios";
import {
  SpotifyCurrent,
  SpotifyRecent,
  SpotifyTracks,
  SpotifyUser,
} from "../../types/spotify";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const requestHandler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (!client_id || !client_secret) {
    return res.status(500).json({
      message: "some secrets are not set",
    });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "well, thats not allowed is it?" });
  }

  const { "x-spotify-code": spotifyCode } = req.headers;

  if (!spotifyCode) {
    return res.status(401).json({ message: "no user?" });
  }

  try {
    // 1. get spotify user
    const { data: user } = await axios.get<SpotifyUser>(
      "https://api.spotify.com/v1/me",
      {
        headers: {
          Authorization: "Bearer " + spotifyCode,
        },
      }
    );

    // 2. get user's top artists
    const { data: tracks } = await axios.get<SpotifyTracks>(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: "Bearer " + spotifyCode,
        },
      }
    );

    // 3. get recently played
    const { data: recent } = await axios.get<SpotifyRecent>(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: "Bearer " + spotifyCode,
        },
      }
    );

    // 3. get currently playing
    const { data: current } = await axios.get<SpotifyCurrent>(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + spotifyCode,
        },
      }
    );

    return res.json({ tracks, user, recent, current });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "well, there was an error. check the console." });
  }
};

export default requestHandler;
