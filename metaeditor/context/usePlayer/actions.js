import React from "react"

// reducers
import reducer from './reducer'

// context
import { usePS } from '../../components/'


const actions = () => {
  const PS = usePS()

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const response = new class {
    get state() {
      return PS.state;
    }
    get cls() {
      return PS.cls;
    }
    get connector() {
      return PS.connector;
    }
  }

  return response
};

export default actions
