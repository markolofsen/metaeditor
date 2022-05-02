import * as React from 'react';

// context
import { usePWA } from '../../../@common/hooks/';

// material
import Icon from '@mui/material/Icon';

// components
import Button from './Button';


function InstallPwa() {
  const [prompt, promptToInstall] = usePWA();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  if (!isVisible) {
    return <div />;
  }

  return (
    <Button onClick={() => {
      hide()
      promptToInstall()
    }} tooltip="Install PWA">
      <Icon>
        install_desktop
      </Icon>
    </Button>
  );
}

export default InstallPwa
