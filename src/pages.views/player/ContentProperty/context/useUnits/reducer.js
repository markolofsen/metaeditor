const initialState = {
  current_panel: 'plans',
  current_unit: false,
  data_plans: false,
  data_units: false,
  data_commercial: false,
  data_units_overview: false,

  filters: {
    plan_id: null,
    bedrooms: 0,
    price_interval: [0, 9999999999],
  },

  filters_size: false,
};

const KEY = {
  UPDATE: 'UPDATE',
  UPDATE_FILTERS: 'UPDATE_FILTERS',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if(type === KEY.UPDATE) {
    // console.error(anValue);
    return { ...state, ...anValue };

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
