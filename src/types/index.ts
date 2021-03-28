import { IGatsbyImageData } from 'gatsby-plugin-image'

export const HEAD: string = 'head'
export const BODY: string = 'body'
export const LEGS: string = 'legs'
export const FEET: string = 'feet'

export type IPartName = typeof HEAD | typeof BODY | typeof LEGS | typeof FEET

export type IChildImageSharp = {
  localFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}

export interface IBodyParts {
  productType: string
  title: string
  images: IChildImageSharp
  amount: number
}
export interface IBodyPart {
  productType: string
  parts: IBodyParts[]
}
