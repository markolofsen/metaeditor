import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor, PlayerConfigProps } from 'pixel-streaming'

// snippets
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

  return (
    <MetaEditor {...newConfig}>
      <Controls />
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
