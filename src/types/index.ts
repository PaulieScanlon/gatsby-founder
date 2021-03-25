import { IGatsbyImageData } from 'gatsby-plugin-image'
export const HEAD = 'head'
export const BODY = 'body'
export const LEGS = 'legs'
export const FEET = 'feet'

export type IPartName = typeof HEAD | typeof BODY | typeof LEGS | typeof FEET

export interface IBodyParts {
  HEAD: IBodyPart[]
  BODY: IBodyPart[]
  LEGS: IBodyPart[]
  FEET: IBodyPart[]
}

export type IChildImageSharp = {
  localFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export interface IBodyPart {
  images: IChildImageSharp

  productType: string
  title: string
}
