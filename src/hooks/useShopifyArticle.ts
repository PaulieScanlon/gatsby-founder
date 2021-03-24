import { graphql, useStaticQuery } from 'gatsby'

export const useShopifyArticle = () => {
  const {
    allShopifyArticle: { nodes },
  } = useStaticQuery(graphql`
    query {
      allShopifyArticle {
        nodes {
          title
          articlePath: gatsbyPath(filePath: "/{shopifyArticle.blog__title}/{shopifyArticle.title}")
        }
      }
    }
  `)

  return nodes
}
