import React from 'react';
import PropTypes from 'prop-types';

// material
import { withStyles, alpha } from '@mui/material/styles';
import MuiChip from '@mui/material/Chip';




const Chip = withStyles(theme => ({
  root: {
    pointerEvents: 'all',
    backgroundColor: alpha(theme.palette.primary.dark, .6),
    fontWeight: theme.typography.fontWeightMedium,
    "&&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
    "&&:focus": {
      backgroundColor: theme.palette.primary.main,
    },
    '&[data-selected="true"]': {
      backgroundColor: theme.palette.primary.main,
      cursor: 'default'
    },
  },
  label: {
    // pointerEvents: 'all',
  },
}))(MuiChip);

function ChipCustom(props) {

  return (
    <div>
      <Chip
        disabled={props.disabled}
        label={props.label}
        onClick={props.onClick}
        data-selected={props.selected} />
    </div>
  );
}

ChipCustom.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ChipCustom
