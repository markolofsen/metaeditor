const initialState = {
  current_panel: 'plans',
  data_plans: false,
  data_units: false,
  data_commercial: false,
  data_units_overview: false,

  filters: {
    plan_id: null,
    bedrooms: 0,
    price_interval: [0, 0],
  },

  filters_size: false,
};

const KEY = {
  UPDATE: 'UPDATE',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(type);

  if(type === KEY.UPDATE) {
    // console.error({anValue});
    return { ...state, ...anValue };

  } else if(type === KEY.SWITCH_PANEL) {
    const current_panel = anValue
    return { ...state, current_panel };

  } else if(type === KEY.UPDATE_FILTERS) {
    // console.error({anValue});

    state.filters = {
      ...state.filters,
      ...anValue,
    }
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
