if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        // name: `images`,
        // name: `posts`,
        path: `${__dirname}/src/`,
        // path: `${__dirname}/src/images`,
        // path: `${__dirname}/src/db/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price", "Product"],
        secretKey: process.env.GATSBY_STRIPE_SECRET_KEY,
        // secretKey:
        //   " sk_test_51HGUuRHwITO0GSJrtMeWmTR6WduzZYAU2VTPRyBrY0wqKp0iBeeLKNwuIm6UOMT3o2IyodrpNB2gXJV4D4BJInv700HWefHxma",
        downloadFiles: false,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },

    // {
    //   resolve: "gatsby-plugin-transition-link",
    //   options: {
    //     layout: require.resolve(`./src/components/layout.js`),
    //   },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
