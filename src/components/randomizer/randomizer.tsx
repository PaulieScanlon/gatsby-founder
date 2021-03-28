import { graphql, useStaticQuery } from 'gatsby'
import React, { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Label, Select } from 'theme-ui'
import { useShopifyShop } from '../../hooks'
import { BODY, FEET, HEAD, IBodyPart, IBodyParts, LEGS } from '../../types'
import { BodyPart } from '../body-part'

const sortOrder = [HEAD, BODY, LEGS, FEET]

export const Randomizer: FunctionComponent = memo(() => {
  const { moneyFormat } = useShopifyShop()

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

  const [parts, setParts] = useState([])

  const [options, setOptions] = useState({
    [HEAD]: {
      value: '',
      index: 0,
    },
    [BODY]: {
      value: '',
      index: 0,
    },
    [LEGS]: {
      value: '',
      index: 0,
    },
    [FEET]: {
      value: '',
      index: 0,
    },
  })

  const handleRandomize = () => {
    setOptions({
      ...parts.reduce((acc, curr) => {
        const { productType, parts } = curr
        const partsLength = parts.length - 1
        const randomIndex = Math.round(Math.random() * partsLength)
        acc[productType] = acc[productType] || {}
        acc[productType] = {
          index: randomIndex,
          value: curr.parts[randomIndex].title,
        }

        return acc
      }, {}),
    })
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const {
      value,
      id,
      options: { selectedIndex },
    } = event.currentTarget

    setOptions({
      ...options,
      [id]: {
        value: value,
        index: selectedIndex,
      },
    })
  }

  useEffect(() => {
    // @TODO this is gross! - fix later
    const parts = products.reduce((parts, part) => {
      const { title, productType, images }: IBodyParts = part

      if (productType && sortOrder.includes(productType)) {
        parts[productType] = parts[productType] || []
        parts[productType].push({
          title,
          productType,
          images,
          amount: part.variants[0].priceV2.amount,
        })
      }
      return parts
    }, {})

    setParts(
      Object.keys(parts)
        .map((key) => {
          return { productType: key, parts: parts[key] }
        })
        .sort((a, b) => sortOrder.indexOf(a.productType) - sortOrder.indexOf(b.productType)),
    )
  }, [])

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
        {parts.map((part: IBodyPart, index: number) => {
          const { productType, parts } = part
          return (
            <BodyPart
              key={index}
              partName={productType}
              partVariants={parts}
              randomIndex={options[productType].index}
            />
          )
        })}
      </Grid>
      <Box>
        <Grid>
          {parts.map((part: IBodyPart, index: number) => {
            const { productType, parts } = part

            return (
              <Grid
                key={index}
                sx={{
                  gap: 1,
                }}
              >
                <Label htmlFor={productType}>{productType}</Label>
                <Select id={productType} onChange={handleChange} value={options[productType].value}>
                  {parts.map((part: IBodyParts, index: number) => {
                    const { title, amount } = part
                    return (
                      <option key={index} value={title}>
                        {`${title} | ${moneyFormat}${amount}`}
                      </option>
                    )
                  })}
                </Select>
              </Grid>
            )
          })}
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
    </Grid>
  )
})
