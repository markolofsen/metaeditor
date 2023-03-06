import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaEditor } from 'pixel-streaming'

// snippets
import Controls from './Controls'

const PlayerView = () => {
  return (
    <MetaEditor
      debugMode
      showToolbar
      psHost='wss://ps1.unrealos.com'
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

export default function AppHOC() {
  return (
    <MetaProvider>
      <PlayerView />
    </MetaProvider>
  );
}
