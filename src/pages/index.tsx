import React, { Fragment, FunctionComponent } from 'react'
import { Heading, Text } from 'theme-ui'
import { Randomizer } from '../components/randomizer'

const IndexPage: FunctionComponent = () => (
  <Fragment>
    <Heading as="h1">Founder Logo</Heading>
    <Text as="p">intro text</Text>
    <Randomizer />
  </Fragment>
)

export default IndexPage
