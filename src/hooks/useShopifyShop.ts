import { graphql, useStaticQuery } from 'gatsby'

export const useShopifyShop = () => {
  const { shopifyShop } = useStaticQuery(graphql`
    query {
      shopifyShop {
        name
        moneyFormat
      }
    }
  `)

  return {
    ...shopifyShop,
    moneyFormat: shopifyShop.moneyFormat.split('')[0],
  }
}
