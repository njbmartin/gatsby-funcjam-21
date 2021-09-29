import { Box, Container, Grid, Link, Paragraph } from "@theme-ui/components";
import React, { FC } from "react";
import { Heading, Image, Text } from "theme-ui";
import TimeAgo from "javascript-time-ago";
import ReactTimeAgo from "react-time-ago";
import en from "javascript-time-ago/locale/en.json";

import { SpotifyRecent } from "../../types/spotify";

TimeAgo.addDefaultLocale(en);

interface RecentListProps {
  recent: SpotifyRecent;
}

export const RecentList: FC<RecentListProps> = ({ recent }) => {
  if (!recent) return null;

  const { items: tracks } = recent;

  return (
    <Container
      sx={{ maxWidth: 960, px: 4, pt: 2, position: "relative", color: "white" }}
    >
      <Heading
        as="h2"
        sx={{
          mb: 4,
        }}
      >
        Recently played
      </Heading>

      {tracks.map(({ track, played_at }) => (
        <Link
          href={track.uri}
          sx={{
            textDecoration: "none",
          }}
          key={track.uri}
        >
          <Grid
            columns={"60px 1fr 1fr"}
            gap={2}
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: "white",
            }}
          >
            <Box
              sx={{
                position: "relative",
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
              <Paragraph
                sx={{
                  fontWeight: "bold",
                }}
              >
                {track.name}
              </Paragraph>
              <Text>By {track.album.artists[0].name}</Text>
            </Box>
            <Box
              sx={{
                textAlign: "right",
              }}
            >
              <ReactTimeAgo date={new Date(played_at)} locale="en-US" />
            </Box>
          </Grid>
        </Link>
      ))}
    </Container>
  );
};
