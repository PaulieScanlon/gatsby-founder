/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx } from 'theme-ui'

interface IPolygonProps {
  /** HTML id attrivute */
  id: string
  /** The viewbox */
  viewBox: string
  /** The polygon points */
  points: string
}

export const Polygon: FunctionComponent<IPolygonProps> = ({ id, viewBox, points }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox={viewBox}
      sx={{
        filter: 'url(#shadow)',
        polygon: {
          fill: 'background',
        },
      }}
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="-2" dy="2" stdDeviation="5" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>
      <title>{id}</title>
      <g id={id}>
        <polygon points={points} />
      </g>
    </svg>
  )
}
