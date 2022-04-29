const initialState = {
  current_menu: 'overview',
  show_interface: true,
  outdoor_rotate: false,
  slider_expanded: false,
  appbar_size: false,
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
