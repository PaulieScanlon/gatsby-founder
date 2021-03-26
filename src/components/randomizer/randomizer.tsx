import { graphql, useStaticQuery } from 'gatsby'
import React, { Fragment, FunctionComponent, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Select } from 'theme-ui'
import { IBodyPart, IBodyParts, IPartName } from '../../types'
import { BodyPart } from '../body-part'

export const Randomizer: FunctionComponent = () => {
  const [trigger, setTrigger] = useState(false)
  const [randomIndexes, setRandomIndexs] = useState(null)

  const {
    shopifyCollection: { products },
  } = useStaticQuery(graphql`
    query {
      shopifyCollection(title: { eq: "Randomizer" }) {
        title
        products {
          title
          productType
          variants {
            priceV2 {
              amount
            }
          }
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

  const parts = products.reduce(
    (parts: IBodyParts, part: IBodyPart) => {
      const { productType } = part
      parts.images[productType] = parts.images[productType] || []
      parts.lengths[productType] = parts.lengths[productType] || {}
      parts.images[productType].push(part)
      parts.lengths[productType] = parts.images[productType].length

      return parts
    },
    { images: {}, lengths: {} },
  )

  const getRandomIndexes = () =>
    Object.keys(parts.lengths).reduce((items, item) => {
      items[item] = items[item] || {}
      items[item] = Math.floor(Math.random() * parts.lengths[item])
      return items
    }, {})

  const handleRandomize = () => {
    setTrigger(!trigger)
    setRandomIndexs(getRandomIndexes())
  }

  useEffect(() => {
    setRandomIndexs(getRandomIndexes())
  }, [])

  return (
    <Grid
      sx={{
        gridTemplateColumns: '1fr 2fr',
      }}
    >
      {randomIndexes ? (
        <Fragment>
          <Grid
            sx={{
              gap: 0,
            }}
          >
            {Object.keys(parts.images)
              .map((partName: IPartName, index: number) => {
                return (
                  <BodyPart
                    key={index}
                    partName={partName}
                    partVariants={parts.images[partName]}
                    randomIndex={randomIndexes[partName]}
                  />
                )
              })
              .reverse()}
          </Grid>
          <Box>
            <Grid>
              {Object.keys(parts.images)
                .map((partName: IPartName, index: number) => {
                  return (
                    <Select key={index}>
                      {parts.images[partName]
                        .map((option: IBodyPart, index: number) => {
                          const {
                            title,
                            variants: {
                              0: {
                                priceV2: { amount },
                              },
                            },
                          } = option

                          return (
                            <option
                              key={index}
                              value={title}
                              selected={index === randomIndexes[partName] ? true : false}
                            >
                              {`${title} | ${amount}`}
                            </option>
                          )
                        })
                        .reverse()}
                    </Select>
                  )
                })
                .reverse()}
            </Grid>
            <Flex
              sx={{
                py: 3,
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={() => handleRandomize()}>Randomize</Button>
            </Flex>
          </Box>
        </Fragment>
      ) : null}
    </Grid>
  )
}
