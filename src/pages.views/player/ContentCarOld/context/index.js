/* Usage

***** wrapper
// context
import ContextProvider from 'src/context/';

return (
  <ContextProvider>
    {children...}
  </ContextProvider>
)

***** injection
// context
import {useLayout} from './context/';

const layout = useLayout()

*/


import React from "react";

// common
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
