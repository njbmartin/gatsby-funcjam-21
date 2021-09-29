import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import { SpotifyProvider } from "./src/context/spotifyContext";

const queryClient = new QueryClient();

export const wrapRootElement = ({ element }) => (
  <QueryClientProvider client={queryClient}>
    <SpotifyProvider>{element}</SpotifyProvider>
  </QueryClientProvider>
);
