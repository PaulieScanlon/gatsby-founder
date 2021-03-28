import { graphql, Link as GatsbyLink } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Box, Container, Heading } from 'theme-ui'
import { useShopifyArticle } from '../hooks'

interface IShopifyBlogPage {
  /** shopifyBlog page data */
  data: {
    shopifyBlog: {
      title: string
    }
  }
}

const ShopifyBlogPage: FunctionComponent<IShopifyBlogPage> = ({
  data: {
    shopifyBlog: { title },
  },
}) => {
  const allShopifyArticles = useShopifyArticle()

  return (
    <Container>
      <Heading as="h1">{title}</Heading>
      <Box as="ul">
        {allShopifyArticles.map((article, index: number) => {
          const { title, articlePath } = article

          return (
            <GatsbyLink key={index} to={articlePath}>
              <Box as="li">
                <Box>{title}</Box>
              </Box>
            </GatsbyLink>
          )
        })}
      </Box>
    </Container>
  )
}

export const query = graphql`
  query($title: String) {
    shopifyBlog(title: { eq: $title }) {
      title
    }
  }
`

export default ShopifyBlogPage
