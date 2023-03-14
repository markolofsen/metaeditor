import * as React from 'react'

// reducers
import { Reducer, KEYS } from './reducer'
import { initialState, StateProps } from './initial'

// libs
import { useFullScreenHandle, FullScreenHandle } from "react-full-screen";

const actions = () => {

  // states
  const [state, dispatch]: [StateProps, any] = React.useReducer(Reducer, initialState)

  // hooks
  const fullescreenHandle = useFullScreenHandle();

  // ** Classes
  const cls = new class {

    get state() {
      return state
    }

    get fullescreenHandle() {
      return fullescreenHandle
    }

    dispatch(payload: unknown) {
      dispatch({
        type: KEYS.UPDATE,
        payload,
      })
    }

    handleMenu(bottomMenuIndex: number) {
      this.dispatch({
        bottomMenuIndex,
      })
    }

  }

  return cls
}

export interface ActionProps {
  state: StateProps
  fullescreenHandle: FullScreenHandle
  handleMenu: (bottomMenuIndex: number) => void
}

export default actions
