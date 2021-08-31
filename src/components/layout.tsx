import React, { FC } from "react";
import { Box, Container, Heading, Text } from "theme-ui";
import { useFlags } from "../context/testContext";
import Seo from "./seo";


export const Layout: FC = ({ children }) => {
  const flags = useFlags();
  return (
    <>
    <Seo />
      <Box as="header" bg="primary" color="white" p={4}>
        <Container sx={{ maxWidth: 960, px: 4 }}>
          <Heading>Project Bunting</Heading>
          <Text>
            {flags["ab-description"] ? (
              <>If you see this, vote for Nico!</>
            ) : (
              <>A Gatsby #FuncJam demo by Nicholas Martin</>
            )}
          </Text>
        </Container>
      </Box>
      <Container
        as="main"
        sx={{
          maxWidth: 960,
          px: 4,
        }}
      >
        {children}
      </Container>
    </>
  );
};
