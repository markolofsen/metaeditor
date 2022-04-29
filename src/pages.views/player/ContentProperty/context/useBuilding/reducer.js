const initialState = {
  building_slug: 'ty1',
  building_data: false,
};

const KEY = {
  ADD_BUILDING_DATA: 'ADD_BUILDING_DATA',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if(type === KEY.ADD_BUILDING_DATA) {
    const building_data = anValue
    return { ...state, building_data };
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
