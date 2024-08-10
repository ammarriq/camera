import * as React from 'react'
import Svg, { G, Path, SvgProps } from 'react-native-svg'

export function Settings(props: SvgProps) {
  return (
    <Svg viewBox='0 0 24 24' strokeWidth={1.5} {...props}>
      <G
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        color='currentColor'
      >
        <Path d='M15.5 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0' />
        <Path d='M20.79 9.152C21.598 10.542 22 11.237 22 12s-.403 1.458-1.21 2.848l-1.923 3.316c-.803 1.384-1.205 2.076-1.865 2.456s-1.462.38-3.065.38h-3.874c-1.603 0-2.405 0-3.065-.38s-1.062-1.072-1.865-2.456L3.21 14.848C2.403 13.458 2 12.763 2 12s.403-1.458 1.21-2.848l1.923-3.316C5.936 4.452 6.338 3.76 6.998 3.38S8.46 3 10.063 3h3.874c1.603 0 2.405 0 3.065.38s1.062 1.072 1.865 2.456z' />
      </G>
    </Svg>
  )
}
