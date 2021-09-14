
# Gatsby FuncJam '21 - Project Bunting

A Gatsby #FuncJam submission, created by Nicholas Martin - an A/B testing / feature flag platform made with ☕ and FaunaDB! You can find most details on the [demo site](https://funcjamprojectbunting.gatsbyjs.io/)

1.  **Start developing.**

    To get started clone this repo locally and run `yarn install` to add all necessary packages.

    You will also need to set up the FaunaDB environment variables in `.env.development`. Notably, you will need to set `FAUNADB_SECRET`.

    ```shell
    yarn install
    yarn develop
    ```

2.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000! You can use the UI on the index page to test the functions or directly access them at http://localhost:8000/api/form

    Try editing the function in `src/api/form.ts` or form at `src/pages/index.js`

3.  **Deploy**

You can deploy this example on Gatsby Cloud by copying the example into a new repo and [connecting that to Gatsby Cloud](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/deploying-to-gatsby-cloud/#set-up-an-existing-gatsby-site).

## Dynamic API routing?

I misread the documentation (https://www.gatsbyjs.com/docs/reference/functions/routing/) as I thought I could use dynamic routes using square brackets, eg. `/api/[userId]`, similar syntax to client-only routes. Oddly enough, it works locally, even when serving a build, but doesn't work in Gatsby Cloud... sad face emoji

`res.params.userId` is undefined, but oddly the path is still correctly routed...

For now, I switched to using query, but left in the original dynamic path for visibility.

## Submission Checklist

- [x] Add installation documentation to the README
- [x] Update the `/api` folder with your function
- [x] Submit your theme at https://gatsbyjs.com/func-jam-21/

## Helpful Links

Read the Gatsby [functions docs](https://www.gatsbyjs.com/docs/reference/functions/).
Check out this video all about Gatsby functions 
Take a look at the Functions Use Cases over [here](https://www.gatsbyjs.com/products/cloud/functions/). 
