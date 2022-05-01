const initialState = {
  building: false,
};

const KEY = {
  UPDATE: 'UPDATE',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if(type === KEY.UPDATE) {
    // console.error(anValue);
    return { ...state, ...anValue };

  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
