import * as React from "react"

// ui
import CustomProvider from 'rsuite/CustomProvider';

// layers
import PlayerProvider, { usePlayer } from './usePlayer/';
import SystemProvider, { useSystem } from './useSystem/';


export const ContextProvider: React.FC<any> = (props: any) => {
  return (
    <CustomProvider theme='dark'>
      <SystemProvider>
        <PlayerProvider>
          {props.children}
        </PlayerProvider>
      </SystemProvider>
    </CustomProvider>
  )
}

export {
  usePlayer,
  useSystem,
}

