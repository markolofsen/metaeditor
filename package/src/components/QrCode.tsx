/* Usage

// components
import QrCode from 'src/components/QrCode/'

function Demo() {

  return (

  )
}
*/

import * as React from 'react';

// libs
import ReactQRCode from "react-qr-code";


interface Props {
  level?: 'L' | 'M' | 'Q' | 'H'
  fgColor?: string
  bgColor?: string
  value: string
  size?: number
  title?: string
}

const defaultProps: Props = {
  level: 'L',
  fgColor: '#000000',
  // fgColor: 'var(--rs-bg-overlay)',
  bgColor: '#FFFFFF',
  value: '',
  size: 26,
  title: '',
};

export const QrCode = (props: Props = defaultProps) => {

  return (
    <div>
      <ReactQRCode
        level={props.level}
        bgColor={props.bgColor}
        fgColor={props.fgColor}
        size={props.size}
        title={props.title}
        value={props.value} />
    </div>
  );
}
