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


import LayoutProvider, { useLayout } from './useLayout/';


function ContextProvider(props) {
  return (
    <LayoutProvider>
      {props.children}
    </LayoutProvider>
  )
}

export {
  useLayout,
}

export default ContextProvider
