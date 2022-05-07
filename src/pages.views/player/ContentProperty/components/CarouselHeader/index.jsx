import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { makeStyles } from 'metalib/styles'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// blocks
import ChipsMenu from './ChipsMenu'; export { ChipsMenu }




const useStyles = makeStyles((theme) => ({

  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 3, 2, 2),
  },
  leftList: {
    pointerEvents: 'all',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
    },
    '& > [data-li="title"]': {
      display: 'flex',
      alignItems: 'center',
      ...theme.typography.h5,
      marginRight: theme.spacing(2),
    },
    '& > [data-li="children"]': {
      marginLeft: theme.spacing(2),
    }
  },


}));


function CarouselHeader(props) {
  const classes = useStyles();

  const renderBack = () => {
    if (typeof props.onBack !== 'function') return;

    return (
      <IconButton sx={{ mr: 1 }} onClick={props.onBack}>
        <Icon>arrow_back</Icon>
      </IconButton>
    )
  }

  return (
    <div className={classes.root}>
      <ul className={classes.leftList}>
        <li data-li="title">
          {renderBack()}
          {props.title}
        </li>
        <li data-li="children">
          {props.children}
        </li>
      </ul>

      {props.extra ? (
        <div>
          {props.extra}
        </div>
      ) : ''}

    </div>
  );
}

CarouselHeader.propTypes = {
  onBack: PropTypes.func,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  extra: PropTypes.node,
};


export default CarouselHeader
