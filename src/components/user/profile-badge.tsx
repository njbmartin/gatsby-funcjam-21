import { Avatar, Box, Grid, Link } from "@theme-ui/components";
import React, { FC } from "react";
import { SpotifyUser } from "../../types/spotify";

interface ProfileBadgeProps {
  user: SpotifyUser;
}

export const ProfileBadge: FC<ProfileBadgeProps> = ({ user }) => {
  if (!user)
    return (
      <Box
        sx={{
          backgroundColor: "secondary",
          py: 2,
          px: 3,
          borderRadius: 20,
        }}
      >
        <Link
          href="/api/spotify/login"
          sx={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Login to Spotify
        </Link>
      </Box>
    );
  return (
    <Box
      sx={{
        backgroundColor: "secondary",
        py: 2,
        paddingLeft: 2,
        paddingRight: 3,
        borderRadius: 20,
      }}
    >
      <Grid
        columns={"32px 1fr"}
        gap={2}
        sx={{
          alignItems: "center",
        }}
      >
        <Avatar src={user.images[0].url} /> {user.display_name}
      </Grid>
    </Box>
  );
};
