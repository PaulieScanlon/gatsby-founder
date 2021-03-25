import React, { Fragment, FunctionComponent } from 'react'
import { Heading, Text } from 'theme-ui'

const NotFoundPage: FunctionComponent = () => {
  return (
    <Fragment>
      <Heading as="h1">Not Found</Heading>
      <Text>Page not found</Text>
    </Fragment>
  )
}

export default NotFoundPage
