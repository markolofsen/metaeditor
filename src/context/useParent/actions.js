import React from "react"

// config
import { env } from 'config/'

// reducers
import reducer from './reducer'

// hooks
import { useSound } from 'metalib/common/hooks/'


const actions = () => {
  const soundClick = useSound(env.staticPath('sounds', 'mouse_click.mp3'))

  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);
  const dispatch = (payload) => dispatch_({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const cls = new class {
    constructor() {
      this.state = state
    }
    soundClick() {
      soundClick.play()
    }

  }

  return {
    cls,
  }
};

export default actions
