import * as React from 'react';
import PropTypes from 'prop-types';

// material
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// blocks
import Tooltip from '../Tooltip/'


function UniversalButton(props) {

  return (
    <div>

      <Tooltip placement={props.placement} value={props.tooltip}>
        <IconButton onClick={props.onClick} disabled={props.disabled}>
          <Icon>{props.iconOn}</Icon>
        </IconButton>
      </Tooltip>

    </div>
  )
}


UniversalButton.propTypes = {
  disabled: PropTypes.bool,
  iconOn: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  onClick: PropTypes.func,
};

UniversalButton.defaultProps = {
};


export default UniversalButton
