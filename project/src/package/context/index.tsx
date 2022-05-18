import * as React from "react"

import PlayerProvider, { usePlayer } from './usePlayer/';
import SystemProvider, { useSystem } from './useSystem/';


export const ContextProvider = (props: any) => {
  return (
    <SystemProvider>
      <PlayerProvider>
        {props.children}
      </PlayerProvider>
    </SystemProvider>
  )
}

export {
  usePlayer,
  useSystem,
}

