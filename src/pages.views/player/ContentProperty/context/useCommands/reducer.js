const initialState = {
  menu: [
    {
      label: 'Overview',
      slug: 'overview',
    },
    {
      label: 'Amenities',
      slug: 'amenities',
    },
    {
      label: 'Surroundings',
      slug: 'surroundings',
    },
    {
      label: 'Units',
      slug: 'units',
    },
  ],
  current_menu: 'overview',
  current_amenity: false,
};

const KEY = {
  UPDATE: 'UPDATE',
}


function reducer(state, action) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if(type === KEY.UPDATE) {
    // console.error('anValue',anValue);
    return { ...state, ...anValue };
  }

  return state;
}


export default {
  initialState,
  KEY,
  reducer,
}
