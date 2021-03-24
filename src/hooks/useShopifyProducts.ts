import { graphql, useStaticQuery } from 'gatsby'

export const useShopifyProducts = () => {
  const {
    allShopifyProduct: { nodes },
  } = useStaticQuery(graphql`
    query {
      allShopifyProduct {
        nodes {
          title
          variants {
            priceV2 {
              amount
            }
          }
          images {
            altText
            localFile {
              name
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  return nodes
}
