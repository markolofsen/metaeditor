/* Usage

// components
import QrCode from 'src/components/QrCode/'

function Demo() {

  return (

  )
}
*/

import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import QRCode from "react-qr-code";


function QrCodeComponent(props) {

  return (
    <div>
      <QRCode
        level={props.level}
        bgColor={props.bgColor}
        fgColor={props.fgColor}
        size={props.size}
        title={props.title}
        value={props.value} />
    </div>
  );
}

QrCodeComponent.propTypes = {
  level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
  fgColor: PropTypes.string,
  bgColor: PropTypes.string,
  value: PropTypes.string.isRequired,
  size: PropTypes.number,
  title: PropTypes.string,
};

QrCodeComponent.defaultProps = {
  level: 'L',
  fgColor: '#000000',
  bgColor: '#FFFFFF',
  size: 26,
  title: '',
};

export default QrCodeComponent

// export default React.forwardRef((props, ref) => (
//   <QrCodeComponent {...props} innerRef={ref} />
// ))
