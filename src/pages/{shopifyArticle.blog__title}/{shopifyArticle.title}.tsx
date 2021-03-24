import { graphql, Link as GatsbyLink } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Box, Heading, Text } from 'theme-ui'

interface IShopifyArticleProps {
  /** shopifyArticle page data */
  data: any
}

const ShopifyArticle: FunctionComponent<IShopifyArticleProps> = ({
  data: {
    shopifyArticle: { title, content, blog },
  },
}) => {
  return (
    <Box as="main">
      <GatsbyLink to={`/${blog.handle}`}>Back</GatsbyLink>
      <Heading as="h1">{title}</Heading>
      <Text>{content}</Text>
    </Box>
  )
}

export const query = graphql`
  query($title: String) {
    shopifyArticle(title: { eq: $title }) {
      title
      content
      blog {
        handle
      }
    }
  }
`

export default ShopifyArticle
