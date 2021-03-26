import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import { BODY, FEET, HEAD, IBodyPart, IPartName, LEGS } from '../../types'
import { getRandomRange } from '../../utils'
import { Polygon } from '../polygon'

const config = {
  [HEAD]: {},
  [BODY]: {},
  [LEGS]: {},
  [FEET]: {
    mt: '-6%',
  },
}

interface IBodyPartProps {
  /** object key name */
  partName: IPartName
  /** array of body part images */
  partVariants: IBodyPart[]
  /** image index to show */
  randomIndex: number
}

export const BodyPart: FunctionComponent<IBodyPartProps> = ({ partVariants, partName, randomIndex }) => {
  const [hideIndex, setHideIndex] = useState(0)
  const [randomRotation, setRandomRotation] = useState(180)
  const [randomDuration, setRandomDuration] = useState(0.5)

  useEffect(() => {
    const duration = getRandomRange(0.8, 1.2)

    setTimeout(() => {
      setHideIndex(randomIndex)
    }, (duration * 1000) / 2)
    setRandomRotation(randomRotation + 360)
    setRandomDuration(duration)
  }, [partVariants])

  return (
    <Box
      sx={{
        position: 'relative',
        // https://cubic-bezier.com/#.81,-0.62,.29,1.49
        transition: `${randomDuration}s cubic-bezier(.81,-0.62,.29,1.49) all`,
        transform: `rotate3d(0, 1, 0, ${randomRotation}deg)`,
        ...config[partName],
      }}
    >
      <Polygon partName={partName} />
      {partVariants.map((item: IBodyPart, index: number) => {
        const { title, images } = item

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
            <GatsbyImage alt={title} image={getImage(images[0].localFile)} />
          </Box>
        )
      })}
    </Box>
  )
}
