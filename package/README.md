#### Open Source

# React.js Pixel Streaming for Unreal Engine

[**MetaEditor**](http://metaeditor.io/), created by the team at [UnrealOS](https://unrealos.com/) is a professional web application development solution based on ReactJS and PixelStreaming.

The Open Source MetaEditor offers a complete set of tools for professional developing and running the Unreal Engine’s Applications in browsers.

<p align="center">
  <img src="https://metaeditor.io/assets/video.gif?v=2" width="100%" title="Pixel Streaming">
</p>

The standard implementation of the PixelStreaming significantly complicates developing your own reactive web applications for the Unreal Engine. Initially, the PixelStreaming was a no-architecture javascript solution for interacting, which has reactive web frameworks. Adapting the standard ReactJS for the PixelStreaming is a very long and laborious process, which significantly increases development time, because there are many technical problems to solve. It is related to the peculiarities of browsers, devices, and reactive technologies (like the ReactJS)

The [MetaEditor.io](https://metaeditor.io/) helps to integrate the Unreal Engine v.5 into the browser. It allows you to send commands and get callbacks from the stream server with the Unreal Engine launched.

#### Links:

* [CodeSandBox](https://codesandbox.io/s/pixel-streaming-react-xldl33)

* [Real-time demo](https://ps.metaeditor.io/player/lumen)

* [Documentation](https://metaeditor.io/docs/metaeditor/installation)

* [Discord App](https://discordapp.com/invite/eGHKuQ3BHM)

* [Discussions](https://github.com/markolofsen/metaeditor/discussions)


### Installation

```bash
npm install rsuite pixel-streaming
# or
yarn add rsuite pixel-streaming
```

### Usage

```typescript
import React from 'react'

// global styles
import 'rsuite/dist/rsuite.min.css'

// libs
import { Player, ContextProvider, usePlayer, useSystem, PlayerPropsSchema } from 'pixel-streaming'


const PlayerContext: React.FC = () => {
  const player = usePlayer()
  const system = useSystem()

  React.useEffect(() => {

    if (player.cls.initReady) {
      // player.cls.initPlayer('https://i-00c56684d4fff23e4.cloudvec.com')
      system.cls.connectBuild('lumen')
    }

  }, [player.cls.initReady])

  const playerConfig: PlayerPropsSchema = {
    // Read more:
    // https://metaeditor.io/docs/metaeditor/installation
  }

  return (
    <Player {...playerConfig} />
  )

}

const CustomPlayer: React.FC = () => (
  <ContextProvider>
    <PlayerContext />
  </ContextProvider>
)

export default CustomPlayer
```

<p align="center">
  <img src="https://metaeditor.io/assets/preview.png?v=1" width="100%" title="Pixel Streaming">
</p>

### Attention!

- React `18.1.0`
- Node `16.*`

### Built With

- [React](https://reactjs.org/) — A JavaScript library for building user interfaces
- [MetaEditor](https://metaeditor.io/) — Complete set of tools for professional developing and running the Unreal Engine’s Applications in browsers.
- [Unreal Engine Pixel Streaming](https://docs.unrealengine.com/5.0/en-US) — Library for Unreal Engine.
- [React Suite](https://www.npmjs.com/package/rsuite) — Set of react component libraries for enterprise system products.
