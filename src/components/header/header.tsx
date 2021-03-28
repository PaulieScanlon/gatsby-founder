import { graphql, Link as GatsbyLink, useStaticQuery } from 'gatsby'
import React, { FunctionComponent } from 'react'
import { Box, Flex } from 'theme-ui'

export const Header: FunctionComponent = () => {
  const { allShopifyPage, allShopifyBlog } = useStaticQuery(graphql`
    query {
      allShopifyPage {
        nodes {
          title
          handle
        }
      }
      allShopifyBlog {
        nodes {
          title
          handle
        }
      }
    }
  `)

  return (
    <Box as="header" variant="styles.header">
      <Flex
        sx={{
          justifyContent: 'space-between',
          flexGrow: 1,
        }}
      >
        <Box>
          <GatsbyLink to="/">Founder Logo</GatsbyLink>
        </Box>
        <Flex as="nav">
          <Box as="ul">
            {allShopifyPage.nodes
              .filter((node) => node.handle !== 'index')
              .map((node, index) => {
                const { title, handle } = node
                return (
                  <Box key={index} as="li">
                    <GatsbyLink to={`/${handle}`}>{title}</GatsbyLink>
                  </Box>
                )
              })}
          </Box>
          <Box>|</Box>
          <Box as="ul">
            {allShopifyBlog.nodes.map((node, index) => {
              const { title, handle } = node
              return (
                <Box key={index} as="li">
                  <GatsbyLink to={`/${handle}`}>{title}</GatsbyLink>
                </Box>
              )
            })}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
