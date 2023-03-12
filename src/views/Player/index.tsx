// libs
import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps } from 'pixel-streaming'

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

  const newConfig: PlayerConfigProps = {
    ...defaultConfig,
    ...config,
  }

  // alert(JSON.stringify(newConfig, null, 2))

  return (
    <>
      <MetaEditor {...newConfig}>
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
