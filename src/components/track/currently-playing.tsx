import { Box, Container, Grid } from "@theme-ui/components";
import React, { FC } from "react";
import { Heading, Image, Text } from "theme-ui";

import { SpotifyCurrent } from "../../types/spotify";
import { CurrentProgress } from "./current-progress";

interface CurrentlyPlayingProps {
  current: SpotifyCurrent;
}

export const CurrentlyPlaying: FC<CurrentlyPlayingProps> = ({ current }) => {
  if (!current) return null;

  const { item: track } = current;

  return (
    <>
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
          backgroundImage: `url(${track.album.images[0].url})`,
        }}
      />
      <Container
        sx={{
          maxWidth: 960,
          px: 4,
          pt: 4,
          position: "relative",
          color: "white",
        }}
      >
        <Heading as="h2">Currently playing</Heading>
        <Grid
          columns={"1fr 2fr"}
          gap={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              paddingY: 4,
            }}
          >
            <Image
              src={track.album.images[0].url}
              sx={{
                maxWidth: "640px",
                width: "100%",
              }}
            ></Image>
          </Box>
          <Box
            sx={{
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Heading as="h2">{track.name}</Heading>
            <Text>By {track.album.artists[0].name}</Text>
            <CurrentProgress current={current} />
          </Box>
        </Grid>
      </Container>
    </>
  );
};
