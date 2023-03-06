// libs
import { PlayerConfigProps } from 'pixel-streaming'


const defaultConfig: PlayerConfigProps = {
  debugMode: true,
  showToolbar: true,
  psHost: '',
  psConfig: {
    // https://metaeditor.io/docs/metaeditor/settings/player
    autoPlay: false,
    autoConnect: false,
    startMuted: true,
    hoveringMouse: true,
    fakeMouseWithTouches: true,
    matchViewportRes: true,
  }
}

export default defaultConfig