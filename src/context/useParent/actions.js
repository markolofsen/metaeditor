import React from "react"

// reducers
import reducer from './reducer'


const actions = () => {
  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);
  const dispatch = (payload) => dispatch_({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const cls = new class {
    constructor() {
      this.state = state
    }

    setServerData({ host, port }) {
      const serverData = { host, port }
      dispatch({ serverData })
    }
  }

  return cls
};

export default actions
