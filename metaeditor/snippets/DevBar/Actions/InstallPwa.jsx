import * as React from 'react';

// context
import { usePWA } from '../../../@common/hooks/';

// material
import Icon from '@mui/material/Icon';

// components
import Button from './Button';


function InstallPwa() {
  const pwa = usePWA();

  if (!pwa.accessible) {
    return <></>
  }

  return (
    <Button onClick={pwa.promptToInstall} tooltip="Install PWA">
      <Icon>
        install_desktop
      </Icon>
    </Button>
  );
}

export default InstallPwa
