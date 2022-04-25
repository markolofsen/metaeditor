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
import {useParent, useLayout} from 'src/context/';

const parent = useParent()
const layout = useLayout()

*/


import React from "react";

// common
import ParentProvider, { useParent } from './useParent/';
import LayoutProvider, { useLayout } from './useLayout/';


function ContextProvider(props) {
  return (
    <ParentProvider>
      {props.children}
    </ParentProvider>
  )
}

export {
  useParent,
  useLayout,
}

export default ContextProvider
