const dict = [
  {
    group: 'Building Layer',
    subgroup: 'OVERVIEW',
    commands: {
      building_overview: {
        action: 'Show building overview',
        desc: 'Moves camera to building overview. Removes all existing highlights / slug - building slug',
        value: { slug: 'demo slug' },
      },
    }
  },
  {
    group: 'Building Layer',
    subgroup: 'UNIT SEARCH',
    commands: {
      unit_search_overview: {
        action: 'Show unit search overview',
        desc: 'Moves camera to building overview. Removes all existing highlights / slug - building slug',
        value: { slug: '' },
      },
      filtered_units: {
        action: 'Show filtered units',
        desc: 'Highlight objects that passed within array / units_slugs - array of string values ',
        value: { units_slugs: [] },
      },
      select_apartment: {
        action: 'User selects apartment from list',
        desc: 'Highlight selected apartment object',
        value: { slug: '' },
      },
      deselect_apartment: {
        action: 'deselect apartment',
        desc: 'when user closes preview we need to remove apartment blinking highlight',
        value: {  },
      },
      move_camera_to_apartment: {
        action: 'move camera to show apartment from outside',
        desc: 'Adjust camera to make selected apartment visible in 3d',
        value: { slug: '' },
      },
    }
  },
  {
    group: 'Building Layer',
    subgroup: 'SURROUNDINGS',
    commands: {
      select_surrounding: {
        action: 'User selects surrounding',
        desc: '',
        value: { slug: '' },
      },
      deselect_surrounding: {
        action: 'deselect surrounding',
        desc: '',
        value: {  },
      },
      surroundings_overview: {
        action: 'Show surroundings overview',
        desc: '',
        value: { slug: '' },
      },
      filtered_surroundings: {
        action: 'Show filtered surroundings',
        desc: '',
        value: { slugs: [] },
      },
      move_camera_to_surrounding: {
        action: 'move camera to focus on surrounding ',
        desc: '',
        value: { slug: '' },
      },
    },
  },
  {
    group: 'Building Layer',
    subgroup: 'AMENITIES',
    commands: {
      amenities_overview: {
        action: 'Show amenities overview',
        desc: '',
        value: { slug: '' },
      },
      select_amenity: {
        action: 'User selects amenity',
        desc: 'Highlight amenity / should also adjust camera to make it visible',
        value: { slug: '' },
      },
      deselect_amenity: {
        action: 'Deselect amenity',
        desc: 'remove amenity highlight',
        value: { slug: '' },
      },
      move_camera_to_amenity: {
        action: 'move camera to focus on amenity ',
        desc: '',
        value: { slug: '' },
      },
      filtered_amenities: {
        action: 'Show filtered Amenities',
        desc: '',
        value: { slugs: [] },
      },
    },
  },
]

export default dict
