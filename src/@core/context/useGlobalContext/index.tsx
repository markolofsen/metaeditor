import * as React from 'react'

// classes
import actions from './actions'
import { ActionProps } from './actions'

const Context = React.createContext({} as ActionProps)
export const useGlobalContext = () => React.useContext(Context)

interface Props {
  children: JSX.Element
}

const Provider = (props: Props) => {
  const payload: any = actions()

  return <Context.Provider value={payload}>{props.children}</Context.Provider>
}

export default Provider
