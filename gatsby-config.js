require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-shopify`,
      options: {
        shopName: process.env.GATSBY_SHOPIFY_SHOP_NAME,
        accessToken: process.env.GATSBY_SHOPIFY_ACCESS_TOKEN,
        apiVersion: `2021-01`,
        downloadImages: true,
        shopifyQueries: {
          articles: `
          query GetArticles($first: Int!, $after: String) {
            articles(first: $first, after: $after) {
              edges {
                node {
                  blog {
                    id
                    title
                  }
                  content
                  id
                  handle
                  image {
                    altText
                    id
                    src
                  }
                  title
                  url

                }
              }
            }
          }
        `,
        },
      },
    },
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ['auto', 'webp', 'avif'],
          placeholder: 'blurred',
        },
      },
    },
    `gatsby-transformer-sharp`,
  ],
}
