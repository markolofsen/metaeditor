import React from 'react';
import PropTypes from 'prop-types';

// material
import { makeStyles } from '@mui/styles';
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
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'all',
    '& > [data-li="back"]': {
      marginRight: theme.spacing(2),
    },
    '& > [data-li="title"]': {
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
      <IconButton data-icon onClick={props.onBack}>
        <Icon>arrow_back</Icon>
      </IconButton>
    )
  }

  return (
    <div className={classes.root}>
      <ul className={classes.leftList}>
        {typeof props.onBack === 'function' && (
          <li data-li="back">
            {renderBack()}
          </li>
        )}
        <li data-li="title">
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
