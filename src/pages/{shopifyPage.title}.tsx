import { graphql } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Container, Heading, Text } from 'theme-ui'
import { ProductsView } from '../views/products-view'

interface IShopifyPageProps {
  /** shopifyPage page data */
  data: {
    shopifyPage: {
      title: string
      handle: string
      body: string
    }
  }
}

const ShopifyPage: FunctionComponent<IShopifyPageProps> = ({
  data: {
    shopifyPage: { title, handle, body },
  },
}) => {
  const views = {
    products: <ProductsView />,
  }

  return (
    <Container>
      <Heading as="h1">{title}</Heading>
      <Text as="p">{body}</Text>
      {views[handle] ? views[handle] : null}
    </Container>
  )
}

export const query = graphql`
  query($title: String) {
    shopifyPage(title: { eq: $title }) {
      title
      handle
      body
    }
  }
`

export default ShopifyPage
