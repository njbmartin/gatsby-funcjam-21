# Gatsby FuncJam '21 - Oh My Spotify

A Gatsby #FuncJam submission, created by Nicholas Martin - Using the Spotify Web API to show currently playing track, and recent tracks!

1.  **Getting started.**

    To get started, clone this repo locally and run `yarn install` to add all necessary packages.

    You will also need to set up the environment variables in `.env.development`.

2.  **Spotify Development**

    You can connect to the Spotify API in development mode without needing approval, but you need to specifically give access to users.

    First, head to https://developer.spotify.com/ and log in with your Spotify account.

    Then, head to the dashboard and create an application. Give it any name you like and a brief description.

    Then set up the Redirect URIs, which will be your local url and/or the gatsby cloud URL. (eg: `http://127.0.0.1:8000/`)

    Head to `Users and Access`, and add the spotify accounts you would like to test the app with.

    Add the `Client ID` and `Client Secret` to your environment variables:

    ```
    SPOTIFY_CLIENT_ID
    SPOTIFY_CLIENT_SECRET
    ```

3.  **Start the local development**

    ```shell
    yarn develop
    ```

4.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000! You should see a button to Login to Spofify in the header.

5.  **Deploy**

You can deploy this example on Gatsby Cloud by copying the example into a new repo and [connecting that to Gatsby Cloud](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-gatsby-cloud/#set-up-an-existing-gatsby-site).

## Helpful Links

Read the Gatsby [functions docs](https://www.gatsbyjs.com/docs/reference/functions/).
Take a look at the Functions Use Cases over [here](https://www.gatsbyjs.com/products/cloud/functions/).
