/* Usage

***** wrapper
// context
import ContextProvider from './context/';

return (
  <ContextProvider>
    {children...}
  </ContextProvider>
)

***** injection
// context
import {usePlayer, useLayout, useConnection} from 'player/context/';

const player = usePlayer()

*/


import React from "react";


import PlayerProvider, { usePlayer } from './usePlayer/';
import ConnectionProvider, { useConnection } from './useConnection/';
import SystemProvider, { useSystem } from './useSystem/';


function ContextProvider(props) {
  return (
    <PlayerProvider>
      <ConnectionProvider>
        <SystemProvider>
          {props.children}
        </SystemProvider>
      </ConnectionProvider>
    </PlayerProvider>
  )
}

export {
  usePlayer,
  useConnection,
  useSystem,
}

export default ContextProvider
