import * as React from 'react';

// styles
import { styled } from '../common/styles/'

// material
import CircularProgress from '@mui/material/CircularProgress';


const PreloaderDiv = styled.div((theme) => ({
  position: 'absolute',
  zIndex: -1,

  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 'var(--window-height)',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

}))


function BackPreloader() {

  return (
    <PreloaderDiv>
      <CircularProgress
        color="inherit"
        size={30} />
    </PreloaderDiv>
  )
}

export default BackPreloader
