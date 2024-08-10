import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'

export function ArrowLeftIcon(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <Path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m12 5-7 7m0 0 7 7m-7-7h14'
      />
    </Svg>
  )
}
