import React, { FunctionComponent } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

const Seo: FunctionComponent = () => {
  const {
    site: {
      siteMetadata: { url, title, description, language, keywords },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          url
          title
          description
          language
          keywords
        }
      }
    }
  `)

  return (
    <Helmet>
      {/* Default / HTML */}
      <html lang={language} />
      <title>{title}</title>
      <link rel="canonical" href={url} />

      {/* Primary Meta Tags */}
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords ? keywords.join(', ') : null} />

      {/* Open Graph / Facebook  */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}

export default Seo