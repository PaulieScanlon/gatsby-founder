/** @jsx jsx */
import { FunctionComponent } from 'react'
import { jsx } from 'theme-ui'
import { BODY, FEET, HEAD, IPartName, LEGS } from '../../types'

interface IPolygonProps {
  /** object key name */
  partName: IPartName
}

export const Polygon: FunctionComponent<IPolygonProps> = ({ partName }) => {
  const config = {
    [HEAD]: {
      viewBox: '0 0 589 178.7',
      points: '589,178.7 0,157.7 0,37 589,0',
    },
    [BODY]: {
      viewBox: '0 0 589 238.7',
      points: '589,216.7 0,238.7 0,0 589,22',
    },
    [LEGS]: {
      viewBox: '0 0 589 558.7',
      points: '589,558.7 0,512.7 0,19 589,0',
    },
    [FEET]: {
      viewBox: '0 0 589 251.7',
      points: '589,207.7 0,251.7 0,0 589,43',
    },
  }

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox={config[partName].viewBox}
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
      <title>{partName}</title>
      <g id={partName}>
        <polygon points={config[partName].points} />
      </g>
    </svg>
  )
}
