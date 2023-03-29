import * as React from 'react';

// libs
import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps } from 'pixel-streaming'
import type { IApplication } from 'pixel-streaming'

// layouts
import UserBar from './UserBar'

// blocks
import Controls from './Controls'
import Preloader from './Preloader'

// configs
import defaultConfig from './defaultConfig'


interface Props {
  config: PlayerConfigProps
}

const PlayerView = ({ config }: Props) => {

  const refPlayer = React.useRef(null)

  const newConfig: PlayerConfigProps = {
    ...defaultConfig,
    ...config,
  }

  // alert(JSON.stringify(newConfig, null, 2))

  const handleLoad = (app: IApplication) => {
    console.log('@'.repeat(30))
    console.log('app', app)
    console.log(refPlayer.current)
  }

  return (
    <>
      <MetaEditor
        {...newConfig}
        ref={refPlayer}
        onLoad={handleLoad}>
        <>
          <Preloader />
          <UserBar />
          <Controls />
        </>
      </MetaEditor>
    </>
  );
}

export default function AppHOC(props: Props) {
  return (
    <MetaProvider>
      <PlayerView {...props} />
    </MetaProvider>
  );
}
