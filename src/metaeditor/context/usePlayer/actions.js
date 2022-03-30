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

  const commands = new class {
    constructor() { }

    async emit(payload) {
      // const { type, value, verification_id, error, fakeResponse } = payload
      return await PS.emit.async(payload)
    }

    // testCommand(value) {
    //   this.emit({type: 'test_command', value})
    // }
  }

  const response = new class {
    get state() {
      return PS.state;
    }
    get cls() {
      return PS.cls;
    }
    get cmd() {
      return commands;
    }
  }

  return response
};

export default actions
