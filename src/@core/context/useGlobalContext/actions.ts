import * as React from 'react'

// reducers
import { Reducer, KEYS } from './reducer'
import { initialState, StateProps } from './initial'


const actions = () => {

  // ** States
  const [state, dispatch]: [StateProps, any] = React.useReducer(Reducer, initialState)

  // ** Classes
  const cls = new class {

    get state() {
      return state
    }

    dispatch(payload: unknown) {
      dispatch({
        type: KEYS.UPDATE,
        payload,
      })
    }

  }

  return cls
}

export interface ActionProps {

}

export default actions
