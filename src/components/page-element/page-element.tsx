import React, { FunctionComponent } from 'react'
import { Box } from 'theme-ui'
import { Header } from '../header'

export const PageElement: FunctionComponent = ({ children }) => {
  return (
    <Box as="main" variant="styles.main">
      <Header />
      {children}
    </Box>
  )
}
