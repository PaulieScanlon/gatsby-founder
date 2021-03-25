import { graphql, useStaticQuery } from 'gatsby'
import React, { FunctionComponent, useState } from 'react'
import { Box, Button, Grid } from 'theme-ui'
import { IBodyPart, IBodyParts, IPartName } from '../../types'
import { BodyPart } from '../body-part'

export const Randomizer: FunctionComponent = () => {
  const [trigger, setTrigger] = useState(false)
  const handleRandomize = () => {
    setTrigger(!trigger)
  }

  const {
    shopifyCollection: { products },
  } = useStaticQuery(graphql`
    query {
      shopifyCollection(title: { eq: "Randomizer" }) {
        title
        products {
          title
          productType
          images {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  `)

  const parts = products.reduce((parts: IBodyParts, part: IBodyPart) => {
    parts[part.productType] = parts[part.productType] || []
    parts[part.productType].push(part)
    return parts
  }, {})

  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr 2fr',
      }}
    >
      <Grid
        sx={{
          gap: 0,
        }}
      >
        {Object.keys(parts)
          .map((partName: IPartName, index: number) => {
            return <BodyPart key={index} partName={partName} partVariants={parts[partName]} />
          })
          .reverse()}
      </Grid>
      <Box>
        <Button onClick={handleRandomize}>Randomize</Button>
      </Box>
    </Grid>
  )
}
