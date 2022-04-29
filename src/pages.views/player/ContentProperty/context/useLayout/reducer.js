const initialState = {
  current_menu: 'overview',
  components: {
    streamDrawer: {
      active: false,
      slug: false,
    },
    draggableCard: {
      active: false,
      data: false,
    },
  },
  ui_visible: true,
};

const KEY = {
  UPDATE: 'UPDATE',
  COMPONENT: 'COMPONENT'
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if (type === KEY.UPDATE) {
    return { ...state, ...anValue };
  } else if (type === KEY.COMPONENT) {

    const key = Object.keys(anValue)[0]
    const renew = {
      [key]: {
        ...state.components[key],
        ...anValue[key],
      }
    }

    state.components = {
      ...state.components,
      ...renew,
    }
    // console.error('state', state);

    return { ...state };
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
