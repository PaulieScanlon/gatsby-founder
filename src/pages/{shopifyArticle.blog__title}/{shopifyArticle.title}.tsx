import { graphql, Link as GatsbyLink } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Container, Heading, Text } from 'theme-ui'

interface IShopifyArticleProps {
  /** shopifyArticle page data */
  data: {
    shopifyArticle: {
      title: string
      content: string
      blog: {
        handle: string
      }
    }
  }
}

const ShopifyArticle: FunctionComponent<IShopifyArticleProps> = ({
  data: {
    shopifyArticle: { title, content, blog },
  },
}) => {
  return (
    <Container>
      <GatsbyLink to={`/${blog.handle}`}>Back</GatsbyLink>
      <Heading as="h1">{title}</Heading>
      <Text>{content}</Text>
    </Container>
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
