import React from 'react';
import PropTypes from 'prop-types';

// material
import { makeStyles } from '@mui/styles';
// import IconButton from '@mui/material/IconButton';
// import Icon from '@mui/material/Icon';

// components
import Chip from '../Chip/'



const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    '& > *': {
      marginRight: theme.spacing(1)
    }
  },

}));


function ChipsMenu(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.list.map((item, index) => (
        <Chip key={index} {...item} />
      ))}
    </div>
  );
}

const listObjects = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
}

ChipsMenu.propTypes = {
  list: PropTypes.arrayOf(PropTypes.exact(listObjects)).isRequired,
  // slug: PropTypes.string.isRequired,
};


export default ChipsMenu
