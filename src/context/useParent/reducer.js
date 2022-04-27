const initialState = {

};

const KEY = {
  UPDATE: 'UPDATE',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if (type === KEY.UPDATE) {
    return { ...state, ...anValue };
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
