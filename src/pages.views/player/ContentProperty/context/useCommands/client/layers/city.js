const dict = [
  {
    group: 'City Layer',
    subgroup: '',
    commands: {
      city_overview: {
        action: 'Show buildings: Shows city',
        desc: 'Shows city',
        value: { slug: '' },
      },
      select_building: {
        action: 'User selects building',
        desc: 'array of string values (building slugs) ',
        value: { select_building: [] },
      },
      select_building: {
        action: 'User selects building',
        desc: '',
        value: { slug: 'test slug' },
      },
      deselect_building: {
        action: 'deselect building',
        desc: '',
        value: {  },
      },
      move_camera_to_building: {
        action: 'move camera to focus on building',
        desc: '',
        value: { slug: 'test slug' },
      },
      camera_vertical_bind: {
        action: 'move camera up/down on building',
        desc: 'slug = building ID, position value float between 0 and 1',
        value: { slug: 0, position: 0 },
      },
    },
  }
]

export default dict
