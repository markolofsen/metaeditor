import * as React from 'react'

// mui
import { styled } from '@mui/system';

// libs
import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps } from 'pixel-streaming'

// configs
import defaultConfig from 'src/views/Player/defaultConfig'


const config: PlayerConfigProps = {
  ...defaultConfig,
  debugMode: 'off',
  showToolbar: false,
  psHost: 'wss://ps1.unrealos.com/',
}


const Wrapper = styled('div')(({ theme }: any) => ({
  '#streamingVideo': {
    // objectFit: 'cover',
  }
}))


const PlayerView = () => {

  const newConfig: PlayerConfigProps = {
    ...defaultConfig,
    ...config,
  }

  // alert(JSON.stringify(newConfig, null, 2))

  return (
    <Wrapper>
      <MetaEditor {...newConfig} />
    </Wrapper>
  );
}

export default function AppHOC() {
  return (
    <MetaProvider>
      <PlayerView />
    </MetaProvider>
  );
}

