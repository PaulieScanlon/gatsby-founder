import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FunctionComponent } from 'react'
import { Box, Card, Grid, Heading, Text } from 'theme-ui'
import { useShopifyProducts, useShopifyShop } from '../../hooks'

export const ProductsView: FunctionComponent = () => {
  const { moneyFormat } = useShopifyShop()
  const allShopifyProducts = useShopifyProducts()

  return (
    <Box>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr 1fr'],
        }}
      >
        {allShopifyProducts.map((product, index: number) => {
          const {
            title,
            variants: {
              0: {
                priceV2: { amount },
              },
            },
            images: {
              0: {
                altText,
                localFile: { childImageSharp },
              },
            },
          } = product

          return (
            <Card key={index}>
              <Heading as="h3">{title}</Heading>
              <Text>{`${moneyFormat}${amount}`}</Text>
              <GatsbyImage alt={altText} image={getImage(childImageSharp)} />
            </Card>
          )
        })}
      </Grid>
    </Box>
  )
}
