import * as React from 'react';
import PropTypes from 'prop-types';


// material
import { styled } from 'metalib/styles'
import MuiTooltip from '@mui/material/Tooltip';
// import Icon from '@mui/material/Icon';

const Tooltip = styled.withStyles(MuiTooltip, theme => ({
  tooltip: {
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.primary.main,
  },
}))


function TooltipComponent(props) {

  return (
    <Tooltip
      open={props.open || undefined}
      enterTouchDelay={0}
      placement={props.placement}
      title={props.value}>
      {props.children}
    </Tooltip>
  );
}

TooltipComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  placement: PropTypes.oneOf(['left', 'right', 'top', 'bottom']).isRequired,
  open: PropTypes.bool,
};

TooltipComponent.defaultProps = {
  // open: false,
}

export default TooltipComponent
