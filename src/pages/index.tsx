import "rsuite/dist/rsuite.min.css";
import { MetaProvider, MetaPlayer } from 'metaeditor4'

export default function Page() {

  return (
    <MetaProvider>
      <MetaPlayer
        showPreloader
        showToolbar
        psHost='wss://ps1.unrealos.com'
        autoPlay={false}
        autoConnect
        startMuted
        hoveringMouse
        fakeMouseWithTouches
        matchViewportRes
      />
    </MetaProvider>
  );
}
