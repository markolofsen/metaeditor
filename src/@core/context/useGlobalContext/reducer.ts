import { StateProps } from './initial'

const KEYS = {
  UPDATE: 'UPDATE'
}

function Reducer(state: StateProps, action: any) {
  const { type, payload: anValue } = action

  if (type === KEYS.UPDATE) {
    return { ...state, ...anValue }
  }

  return state
}

export { Reducer, KEYS }
