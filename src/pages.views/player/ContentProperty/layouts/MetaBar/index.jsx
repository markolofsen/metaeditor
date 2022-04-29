import * as React from 'react';

// material
import Portal from '@mui/material/Portal';

// block
import QuickNavigation from './QuickNavigation'

// snippets
import {
  KeyboardHelper,
  QrCodeTransition,
} from 'metaeditor/snippets/'

function PublicBar() {
  return (
    <div>
      <Portal container={document.getElementById('metaeditor-toolbar-left')}>
        <QuickNavigation />
      </Portal>
      <Portal container={document.getElementById('metaeditor-toolbar-right')}>
        <KeyboardHelper />
        <QrCodeTransition />
      </Portal>
    </div>
  )
}

export default PublicBar
