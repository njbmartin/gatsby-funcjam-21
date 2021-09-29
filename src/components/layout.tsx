import React, { FC } from "react";
import { Avatar, Box, Container, Grid, Heading, Link, Text } from "theme-ui";
import { useSpotify } from "../context/spotifyContext";
import Seo from "./seo";
import { ProfileBadge } from "./user/profile-badge";

export const Layout: FC = ({ children }) => {
  const { user } = useSpotify();
  return (
    <Box
      sx={{
        minHeight: "100%",
      }}
    >
      <Seo />
      <Box as="header" bg="primary" color="white">
        <Container sx={{ maxWidth: 960, p: 4 }}>
          <Grid
            columns="1fr 1fr"
            sx={{
              alignItems: "center",
            }}
          >
            <Box>
              <Heading>Oh My Spotify</Heading>
              <Text>A Gatsby FuncJam project by Nicholas Martin</Text>
            </Box>
            <Box
              sx={{
                justifySelf: "end",
              }}
            >
              <ProfileBadge user={user} />
            </Box>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
