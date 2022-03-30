/* Usage

// hooks
import {useStateEvents, useReducerEvents} from 'hooks/'

function Demo() {

  const [state, dispatch] = useReducerEvents(reducer, initialState)
  const [test, setTest] = useStateEvents(false)

  React.useEffect(() => {

    document.addEventListener('demo_key', (e) => {
      console.log(e.detail)
      dispatch({...})
      // or setTest(true)
    })

  }, [])

  return (<div />)

}

*/

import * as React from 'react';


function useStateEvents(initialValue) {
  const [value, setValue] = React.useState(initialValue);

  const ref = React.useRef(value);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}

function useReducerEvents(reducer, initialState) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const ref = React.useRef(state);

  React.useEffect(() => {
    ref.current = state;
  }, [state]);

  return [state, dispatch, ref];
}

export { useStateEvents, useReducerEvents }
export default undefined
