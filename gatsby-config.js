require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    url: `https://project-bunting.gatsbyjs.io/`,
    title: `Project Bunting`,
    description: `Create your own A/B testing tool using Gatsby Functions and FaunaDB`,
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
}
