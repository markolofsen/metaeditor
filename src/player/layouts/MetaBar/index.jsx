import * as React from 'react';

// material
import Portal from '@mui/material/Portal';

// styles
import { styled } from 'metalib/styles/'

// block
import FullscreenButton from './FullscreenButton/'
import VolumeButton from './VolumeButton'
import QuickNavigation from './QuickNavigation'

const RootDiv = styled.div((theme) => ({
  display: 'flex',
  '& > *': {
    marginRight: theme.spacing(1),
    pointerEvents: 'all',
  }
}))

function PublicBar() {
  return (
    <Portal container={document.getElementById('metaeditor-toolbar')}>
      <RootDiv>
        <FullscreenButton />
        <VolumeButton />
        <QuickNavigation />
      </RootDiv>
    </Portal>
  )
}

export default PublicBar
