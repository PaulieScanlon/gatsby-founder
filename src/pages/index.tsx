import React, { FunctionComponent } from 'react'
import { Container, Heading, Text } from 'theme-ui'
import { Randomizer } from '../components/randomizer'

const IndexPage: FunctionComponent = () => (
  <Container>
    <Heading as="h1">Founder Logo</Heading>
    <Text as="p">intro text</Text>
    <Randomizer />
  </Container>
)

export default IndexPage
