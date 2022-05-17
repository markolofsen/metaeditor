import * as React from 'react'

// ui
import CustomProvider from 'rsuite/CustomProvider';

// snippets
import { Player, PlayerPropsSchema } from "./snippets/Player";

// context
import { ContextProvider, usePlayer, useSystem } from './context/';
// import { ContextProvider, usePlayer, useSystem } from './contextTest/';

export {
  Player,
  usePlayer,
  useSystem,
}

export type { PlayerPropsSchema }

export const MetaProvider = (props: any) => (
  <CustomProvider theme='dark'>
    <ContextProvider>
      {props.children}
    </ContextProvider>
  </CustomProvider>
)
