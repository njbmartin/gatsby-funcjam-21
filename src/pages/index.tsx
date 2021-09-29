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

  return (
    <Layout>
      <CurrentlyPlaying current={current} />
      <RecentList recent={recent} />
    </Layout>
  );
};

export default App;
