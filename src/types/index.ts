import { IGatsbyImageData } from 'gatsby-plugin-image'

export const HEAD: string = 'head'
export const BODY: string = 'body'
export const LEGS: string = 'legs'
export const FEET: string = 'feet'

export type IPartName = typeof HEAD | typeof BODY | typeof LEGS | typeof FEET

export interface IBodyParts {
  images: {
    HEAD: IBodyPart[]
    BODY: IBodyPart[]
    LEGS: IBodyPart[]
    FEET: IBodyPart[]
  }
  lengths: {
    HEAD: number
    BODY: number
    LEGS: number
    FEET: number
  }
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
  variants: {
    0: {
      priceV2: {
        amount: number
      }
    }
  }
}
