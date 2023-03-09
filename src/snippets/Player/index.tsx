// libs
import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps } from 'pixel-streaming'

// snippets
import UserBar from 'src/snippets/UserBar'

// blocks
import Controls from './Controls'

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
    <MetaEditor {...newConfig}>
      <>
        <UserBar />
        <Controls />
      </>
    </MetaEditor>
  );
}

export default function AppHOC(props: Props) {
  return (
    <MetaProvider>
      <PlayerView {...props} />
    </MetaProvider>
  );
}
