import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

const client_id = process.env.SPOTIFY_CLIENT_ID;

const scope =
  "user-read-private user-top-read user-read-currently-playing user-read-recently-played";
const SPOTIFY_API_URL = "https://accounts.spotify.com/authorize";
const redirect_uri = process.env.REDIRECT_URI;
const response_type = "token";

const requestHandler = async (
  req: GatsbyFunctionRequest,
  res: GatsbyFunctionResponse
) => {
  if (!client_id) {
    return res.status(500).json({
      message: "some secrets are not set",
    });
  }
  if (req.method !== "GET") {
    return res.status(405).json({ message: "well, thats not allowed is it?" });
  }

  const params = new URLSearchParams({
    response_type,
    client_id,
    scope,
    redirect_uri,
  });

  return res.redirect(`${SPOTIFY_API_URL}?${params.toString()}`);
};

export default requestHandler;
