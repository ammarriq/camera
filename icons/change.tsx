import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export function ChangeIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.977 19.5A9 9 0 0 0 10 3.223M16.977 19.5V16m0 3.5H20.5M7 4.516a9 9 0 0 0 7 16.261M7 4.516V8m0-3.484H3.5'
      />
    </Svg>
  )
}
