import React from "react"

// reducers
import reducer from './reducer'


function useContext() {
  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);

  const cls = new class {
    constructor() {}

    dispatch(payload) {
      dispatch_({type: reducer.KEY.UPDATE, payload: payload})
    }

    setErrors(errors) {
      this.dispatch({errors})
    }

    removeErrors() {
      this.dispatch({errors: {}})
    }

    setInitialValues(initialValues) {
      this.dispatch({initialValues})
    }

  }

  return {
    state,
    cls,
  }
};


export default useContext
