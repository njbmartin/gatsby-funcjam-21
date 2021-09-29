import { GatsbyFunctionRequest, GatsbyFunctionResponse } from "gatsby";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const scopes = "user-read-private user-read-email user-top-read";
const SPOTIFY_API_URL = "";

type SpotifyAuthorization = {
  code: string;
};

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

  const { code } = req.query as SpotifyAuthorization;

  res.json(code);
};

export default requestHandler;
