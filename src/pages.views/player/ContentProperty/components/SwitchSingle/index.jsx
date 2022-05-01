import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { styled } from 'metalib/styles'
import MuiFormControlLabel from '@mui/material/FormControlLabel';
import MuiSwitch from '@mui/material/Switch';


const FormControlLabel = styled.withStyles(MuiFormControlLabel, theme => ({
  label: {
    paddingLeft: theme.spacing(1),
  }
}))


const Switch = styled.withStyles((({ classes, ...props }) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
}),
  (theme) => ({
    root: {
      width: 40,
      height: 24,
      padding: 0,
    },
    '&:disabled': {
      opacity: .1,
      display: 'none'
    },
    switchBase: {
      padding: 2,
      // marginTop: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.common.white,
        '& + $track': {
          backgroundColor: '#52d869',
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: '#52d869',
        border: '6px solid #fff',
      },
    },
    thumb: {
      width: 20,
      height: 20,
    },
    track: {
      borderRadius: 100,
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.primary.dark,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
  }
  ))



function SwitchSingle(props) {

  const handleChange = (event) => {
    props.onChange(event.target.checked)
  };


  const renderSwitch = (obj) => {

    const Obj = (
      <Switch
        disabled={props.disabled}
        checked={props.active}
        size="small"
        onChange={handleChange} />
    )

    if (props.label) {
      return (
        <FormControlLabel
          control={Obj}
          label={props.label}
        />
      )
    }

    return Obj;
  }


  return (
    renderSwitch()
  );
}

SwitchSingle.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};


export default SwitchSingle
