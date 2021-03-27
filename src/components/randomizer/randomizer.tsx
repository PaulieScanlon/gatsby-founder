import { graphql, useStaticQuery } from 'gatsby'
import React, { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react'
import { Box, Button, Flex, Grid, Label, Select } from 'theme-ui'
import { BODY, FEET, HEAD, IBodyPart, IBodyParts, LEGS } from '../../types'
import { BodyPart } from '../body-part'

const sortOrder = [HEAD, BODY, LEGS, FEET]

export const Randomizer: FunctionComponent = memo(() => {
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

  const [randomIndexes, setRandomIndexs] = useState({
    [HEAD]: 0,
    [BODY]: 0,
    [LEGS]: 0,
    [FEET]: 0,
  })

  const handleRandomize = () => {
    setRandomIndexs({
      ...parts.reduce((acc, curr) => {
        const { productType, parts } = curr
        const partsLength = parts.length - 1
        acc[productType] = acc[productType] || {}
        acc[productType] = Math.round(Math.random() * partsLength)

        return acc
      }, {}),
    })
  }

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value, id } = event.currentTarget
    // console.log(`${id} | ${value} | ${event.target[value].label}`)
    setRandomIndexs({
      ...randomIndexes,
      [id]: Number(value),
    })
    // console.log('randomIndex: ', Math.round(Math.random() * event.target.length))
  }

  useEffect(() => {
    // @TODO this is gross! - fix later
    const parts = products.reduce((parts, part) => {
      const { title, productType, images }: IBodyParts = part

      parts[productType] = parts[productType] || []
      parts[productType].push({
        title,
        productType,
        images,
        amount: part.variants[0].priceV2.amount,
      })
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
              randomIndex={randomIndexes[productType]}
            />
          )
        })}
      </Grid>
      <Box>
        <Grid>
          {parts.map((part: IBodyPart, index: number) => {
            // console.log(part)
            const { productType, parts } = part

            return (
              <Grid
                key={index}
                sx={{
                  gap: 1,
                }}
              >
                <Label htmlFor={productType}>{productType}</Label>
                <Select id={productType} onChange={handleChange} value={randomIndexes[productType]}>
                  {parts.map((part: IBodyParts, index: number) => {
                    // console.log(part)
                    const { title, amount } = part
                    return (
                      <option key={index} value={index}>
                        {`${title} | ${amount}`}
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
