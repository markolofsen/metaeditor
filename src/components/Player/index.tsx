import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor } from 'pixel-streaming'

// snippets
import Controls from './Controls'


interface Props {
  psHost: string
}
const PlayerView = (props: Props) => {
  return (
    <MetaEditor
      debugMode
      showToolbar
      psHost={props.psHost}
      psConfig={{
        // https://metaeditor.io/docs/metaeditor/settings/player
        autoPlay: false,
        autoConnect: false,
        startMuted: true,
        hoveringMouse: true,
        fakeMouseWithTouches: true,
        matchViewportRes: true,
      }}>
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
