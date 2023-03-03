import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaPlayer } from 'pixel-streaming'

// snippets
import Controls from './Controls'

const PlayerView = () => {
  return (
    <MetaPlayer
      debugMode
      showToolbar
      psHost='wss://ps1.unrealos.com'
      autoPlay={false}
      autoConnect
      startMuted
      hoveringMouse
      fakeMouseWithTouches
      matchViewportRes>
      <Controls />
    </MetaPlayer>
  );
}

export default function AppHOC() {
  return (
    <MetaProvider>
      <PlayerView />
    </MetaProvider>
  );
}
