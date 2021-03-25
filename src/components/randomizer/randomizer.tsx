import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Box, Button, Grid } from 'theme-ui'
import { getRandomRange } from '../../utils'
import { Polygon } from './polygon'

const polygonStuff = {
  head: {
    viewBox: '0 0 589 178.7',
    points: '589,178.7 0,157.7 0,37 589,0',
  },
  body: {
    viewBox: '0 0 589 238.7',
    points: '589,216.7 0,238.7 0,0 589,22',
  },
  legs: {
    viewBox: '0 0 589 558.7',
    points: '589,558.7 0,512.7 0,19 589,0',
  },
  feet: {
    viewBox: '0 0 589 251.7',
    points: '589,207.7 0,251.7 0,0 589,43',
  },
}

const positionStuff = {
  head: {},
  body: {},
  legs: {},
  feet: {
    mt: '-13px',
  },
}

interface IPartsProps {
  /** array of images */
  array: any
  /** object key name */
  part: string
}

const Parts: FunctionComponent<IPartsProps> = ({ array, part }) => {
  const [hideIndex, setHideIndex] = useState(0)
  const [randomRotation, setRandomRotation] = useState(360)
  const [randomDuration, setRandomDuration] = useState(0.5)

  useEffect(() => {
    const duration = getRandomRange(0.8, 1.2)
    const index = Math.floor(Math.random() * array.length)

    setTimeout(() => {
      setHideIndex(index)
    }, (duration * 1000) / 2)
    setRandomRotation(randomRotation + 360)
    setRandomDuration(duration)
  }, [array])

  return (
    <Box
      sx={{
        position: 'relative',
        // https://cubic-bezier.com/#.81,-0.62,.29,1.49
        transition: `${randomDuration}s cubic-bezier(.81,-0.62,.29,1.49) all`,
        transform: `rotate3d(0, 1, 0, ${randomRotation}deg)`,
        ...positionStuff[part],
      }}
    >
      <Polygon id={part} {...polygonStuff[part]} />
      {array.map((item, index: number) => {
        const {
          title,
          images: {
            0: { localFile },
          },
        } = item
        return (
          <Box
            key={index}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              display: index !== hideIndex ? 'none' : 'block',
            }}
          >
            <GatsbyImage alt={title} image={getImage(localFile)} />
          </Box>
        )
      })}
    </Box>
  )
}

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

  const parts = products.reduce((items, item) => {
    items[item.productType] = items[item.productType] || []
    items[item.productType].push(item)
    return items
  }, {})

  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr 4fr',
      }}
    >
      <Grid
        sx={{
          gap: 0,
        }}
      >
        {Object.keys(parts)
          .map((part, index: number) => {
            return <Parts key={index} part={part} array={parts[part]} />
          })
          .reverse()}
      </Grid>
      <Box>
        <Button onClick={handleRandomize}>Randomize</Button>
      </Box>
    </Grid>
  )
}
