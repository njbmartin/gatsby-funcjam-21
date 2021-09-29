import React, { FC } from "react";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Label,
  Image,
  Paragraph,
  Switch,
  Link,
  Button,
} from "theme-ui";
import { Layout } from "../components/layout";
import { CurrentlyPlaying } from "../components/track/currently-playing";
import { RecentList } from "../components/track/recent-list";
import { useSpotify } from "../context/spotifyContext";

const App: FC = () => {
  const { current, recent } = useSpotify();

  const background = current
    ? current.item.album.images[0].url
    : recent && recent.items[0].track.album.images[0].url;

  return (
    <Layout>
      <Box
        sx={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
          backgroundColor: "#333",
        }}
      />
      {background && (
        <Box
          sx={{
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            filter: "blur(8em) opacity(0.6)",
            position: "absolute",
            backgroundImage: `url(${background})`,
          }}
        />
      )}
      <CurrentlyPlaying current={current} />
      <RecentList recent={recent} />
    </Layout>
  );
};

export default App;
