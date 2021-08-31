import React, { FC, useMemo } from "react";
import { useFlags } from "../context/testContext";
import {
  Badge,
  Box,
  Flex,
  Heading,
  Label,
  Paragraph,
  Switch,
  Link,
} from "theme-ui";
import { Layout } from "../components/layout";

const App: FC = () => {
  const flags = useFlags();

  const flagKeys: string[] = useMemo(
    () => flags && Object.keys(flags),
    [flags]
  );

  return (
    <Layout>
      <Box my={4}>
        <Heading as="h2" my={4}>
          {flags["pirate-speak"] ? <>Ahoy, me hearties! Yarrr!</> : <>Hello!</>}{" "}
          <Badge>pirate-speak</Badge>
        </Heading>
        <Paragraph my={2}>
          This{" "}
          <Link href="https://www.gatsbyjs.com/func-jam-21/">
            Gatsby #FuncJam
          </Link>{" "}
          submission by{" "}
          <Link href="https://twitter.com/njbmartin">Nicholas Martin</Link> has
          been created to demonstrate how{" "}
          <Link href="https://www.gatsbyjs.com/products/cloud/functions/">
            Gatsby Functions
          </Link>{" "}
          could be used to create your own A/B testing platform.
        </Paragraph>
        <Heading my={4}>Here are the flags</Heading>
        <Box mb={4}>
          {flagKeys.map((flag) => (
            <Flex
              key={flag}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                my: 2,
                maxWidth: 240,
              }}
            >
              <Box>
                <Switch
                  id="enable-email-alerts"
                  readOnly
                  checked={!!flags[flag]}
                />
              </Box>
              <Label htmlFor="enable-email-alerts" sx={{ flex: 1 }}>
                <Badge>{flag}</Badge>
              </Label>
            </Flex>
          ))}
        </Box>
        <Paragraph>
          If you see the badges elsewhere on the page, it means the content will
          change depending on if the flag is enabled.
        </Paragraph>
        <Paragraph my={4}>
          Refresh this page, and the flags above should stay the same. Want to
          see what happens when the flags are switched? Try opening this site in{" "}
          <strong>Incognito Mode</strong>, or, delete the{" "}
          <strong>bunting-flags</strong> key from localStorage.
        </Paragraph>
        <Heading my={2}>
          Hidden section example <Badge>hidden-section</Badge>
        </Heading>
        {!!flags["hidden-section"] ? (
          <Paragraph my={4}>
            If you can see this section, then you are incredibly lucky! Or, it
            just means that the flag is enabled.
          </Paragraph>
        ) : (
          <Paragraph my={4}>
            There is nothing to see here (because the flag is disabled).
          </Paragraph>
        )}
        <Box color={!!flags["purple-text"] && "primary"}>
          <Heading my={2}>
            How does it work? <Badge>purple-text</Badge>
          </Heading>
          <Paragraph my={4}>
            Lets start with the React components... Using React Context,{" "}
            <strong>TextProvider</strong> is a component which is used to
            initialise <strong>UserFlags</strong>. It will first check
            localStorage for cached <strong>UserFlag</strong> data, otherwise,
            it will query the <strong>/api/flags/init</strong> endpoint to
            generate a new set of <strong>UserFlags</strong> and store it in{" "}
            <Link href="https://fauna.com/">FaunaDB</Link>.
          </Paragraph>
          <Paragraph my={4}>
            By caching the data using localStorage, any React components relying
            on the <strong>useFlags()</strong> hook should render with the
            enabled flags quickly. It will also ensure the flags are persisted.
            To ensure the user has all the latest flags available, the data will
            be refreshed after <strong>5 minutes</strong>. This timeout also
            helps with limiting invocations.
          </Paragraph>
          <Paragraph my={4}>
            In this demo, flag values are set using{" "}
            <strong>Math.random()</strong>, so won't be reliable for production
            purposes, but it is theoretically possible to ensure a more reliable
            distribution in a <strong>round-robin</strong> style. Hit me up on
            <Link href="https://twitter.com/njbmartin">Twitter</Link> if you
            want more details about this.
          </Paragraph>
        </Box>

        <Heading my={2}>What are the functions?</Heading>
        <Paragraph my={2}>
          <strong>/api/flags/new</strong> can be used to create new flags!
        </Paragraph>

        <Paragraph my={2}>
          <strong>/api/flags/init</strong> creates a new set of{" "}
          <strong>UserFlags</strong>!
        </Paragraph>

        <Paragraph my={2}>
          <strong>/api/flags/{`{userId}`}</strong> retrieves the user's existing
          flag values, and generates values for any missing flags that may have
          been added recently!
        </Paragraph>

        <Paragraph my={4}>
          This was fun, thanks! All the effort went into the Functions, so
          please forgive this rudimentary UI.
        </Paragraph>
      </Box>
    </Layout>
  );
};

export default App;
