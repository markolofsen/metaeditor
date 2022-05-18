import * as React from "react"

// import PlayerProvider, { usePlayer } from './usePlayer/';
import SystemProvider, { useSystem } from './useSystem/';

export const usePlayer = {}
export const ContextProvider = (props: any) => {
  return (
    <SystemProvider>
      {props.children}
    </SystemProvider>
  )
}

export { useSystem }
