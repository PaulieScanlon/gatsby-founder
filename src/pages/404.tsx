import React, { FunctionComponent } from 'react'
import { Container, Heading, Text } from 'theme-ui'

const NotFoundPage: FunctionComponent = () => {
  return (
    <Container>
      <Heading as="h1">Not Found</Heading>
      <Text>Page not found</Text>
    </Container>
  )
}

export default NotFoundPage
