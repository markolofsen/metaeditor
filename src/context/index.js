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
import {useParent} from 'src/context/';

const parent = useParent()

*/


import React from "react";

// common
import ParentProvider, { useParent } from './useParent/';


function ContextProvider(props) {
  return (
    <ParentProvider>
      {props.children}
    </ParentProvider>
  )
}

export {
  useParent,
}

export default ContextProvider
