import * as React from 'react';

// libs
import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps, Hooks, Context } from 'pixel-streaming'

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

  // context
  const global = Context.global()
  const stream = Context.stream()

  // hooks
  const actions = Hooks.actions()
  const events = Hooks.events()
  const listener = Hooks.listener()

  const handleLoad = () => {
    console.log('@'.repeat(30))
    console.dir(refPlayer.current)
    console.dir(global)
    console.dir(stream)
    console.dir(actions)
    console.dir(events)
    console.dir(listener)
  }

  // render
  const newConfig: PlayerConfigProps = {
    ...defaultConfig,
    ...config,
  }

  return (
    <>
      <MetaEditor
        ref={refPlayer}
        onLoad={handleLoad}
        {...newConfig}>
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
