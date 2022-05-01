const dict = [
  {
    group: 'Others',
    subgroup: '',
    commands: {
      left_stick_movement: {
        action: 'Left stick movement',
        desc: 'angle value range: 0 …. 360 / speed value range: 0.0 …. 1.0',
        value: { angle: 0, speed: 0 },
      },
      right_stick_movement: {
        action: 'Right stick movement',
        desc: 'angle value range: 0 …. 360 / speed value range: 0.0 …. 1.0',
        value: { angle: 0, speed: 0 },
      },
      change_day_time: {
        action: 'Change day time',
        desc: 'hour value range: 0 … 23',
        value: { hour: 0 },
      },
      console_command: {
        action: 'Console command',
        desc: '',
        value: { command: '' },
      },
      set_parameter: {
        action: 'Set parameter',
        desc: '',
        value: { parameter_name: '', parameter_value: '' },
      },
      furniture_layer_visibility: {
        action: 'Switch furniture layer visibility',
        desc: 'value - / 1 = true / 0 = false / default is 1(true)',
        value: { isVisible: true },
      },
      reset_controls_state: {
        action: 'Reset controls state(clicks/touches)',
        desc: 'called to refresh engine state when controls got stuck in incorrect state',
        value: {  },
      },
      objects_transparency: {
        action: 'Turn transparency on/off',
        desc: 'value - / 1 = true / 0 = false / default is 0',
        value: { isOn: true },
      },
      camera_vertical_bind: {
        action: 'move camera up/down on building ',
        desc: 'slug = building ID / position value float between 0 and 1',
        value: { slug: 0, position: .5 },
      },
      camera_rotate: {
        action: 'Camera rotate',
        desc: 'angle value range: -1.0 …. 1.0 / rate: 10 values/sec',
        value: { angle: 0 },
      },
      outdoor_zoom: {
        action: 'zoom in/zoom out',
        desc: 'direction: “in“, “out“ / type: “start“, “stop“ / if “stop” not emitted - stops at mix/max zoom range value',
        value: { direction: '', type: '' },
      },
      outdoor_rotate: {
        action: 'outdoor rotate',
        desc: 'value - / 1 = start / 0 = stop',
        value: { isOn: 0 },
      },
      get_state: {
        action: 'get state',
        desc: '',
        value: {  },
      },
      frontend_metadata: {
        action: 'frontend metadata',
        desc: '',
        value: { device_type: '' },
      },
      apartment_interior: {
        action: 'Switch interior',
        desc: 'slug: interior slug ',
        value: { slug: '' },
      },
      shooter_mode: {
        action: 'Shooter Mode',
        desc: '',
        value: { isOn: true },
      },
    },
  },
]

export default dict
