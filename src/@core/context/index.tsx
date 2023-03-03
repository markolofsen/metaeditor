/* Usage

***** wrapper
// Context
import ContextProvider from 'src/@core/context';

return (
  <ContextProvider>
    {children...}
  </ContextProvider>
)

***** injection
// context
import { useGlobalContext } from 'src/context';

const globalContext = useGlobalContext() //as IGlobalProps

*/

import React from 'react'

import GlobalProvider, { useGlobalContext } from './useGlobalContext'

function ContextProvider(props: any) {
  return (
    <GlobalProvider>
      {props.children}
    </GlobalProvider>
  )
}

export { useGlobalContext }
export default ContextProvider
