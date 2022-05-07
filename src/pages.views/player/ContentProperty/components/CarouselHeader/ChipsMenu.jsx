import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { styled } from 'metalib/styles'
// import IconButton from '@mui/material/IconButton';
// import Icon from '@mui/material/Icon';

// components
import Chip from '../Chip/'


const RootDiv = styled.div(theme => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: theme.spacing(-.5),
  '& > *': {
    padding: theme.spacing(.5)
  }
}))


function ChipsMenu(props) {

  return (
    <RootDiv>
      {props.list.map((item, index) => (
        <Chip key={index} {...item} />
      ))}
    </RootDiv>
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
