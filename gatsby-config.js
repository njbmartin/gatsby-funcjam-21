require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    url: `https://ohmyspotify.gatsbyjs.io/`,
    title: `Oh My Spotify`,
    description: `An alternative view of your Spotify currently playing, and recent tracks`,
    language: `en-gb`,
    keywords: [`gatsby`, `gatsby-functions`],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-theme-ui`,
      options: {
        preset: "@theme-ui/preset-funk",
      },
    },
  ],
};
