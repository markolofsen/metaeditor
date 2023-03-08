// libs
import { PlayerConfigProps } from 'pixel-streaming'


const defaultConfig: PlayerConfigProps = {
  debugMode: 'on',
  showToolbar: true,
  psHost: 'ws://127.0.0.1:80',
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