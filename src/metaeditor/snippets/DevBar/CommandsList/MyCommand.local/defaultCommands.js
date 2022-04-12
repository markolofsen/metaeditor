import * as React from 'react';


const cls = new class {
  constructor() {

  }

  get list() {

    let res = {
      // console_command: [
      //   ['', { test: true }],
      // ],
      resolution_change: [
        ['800x600', { width: 800, height: 600 }],
        ['1024x768', { width: 1024, height: 768 }],
      ],
      commands_tree: [
        [null, { value: true }],
      ],
      user_sound: [
        ['0.1', { value: 0.1 }],
        ['0.5', { value: 0.5 }],
        ['1.0', { value: 1.0 }],
      ],
      get_screenshot: [
        [null, { value: true }],
      ],
      commands_history: [
        [null, { value: true }],
      ],
      callbacks_history: [
        [null, { value: true }],
      ],
      debug_mode: [
        ['true', { value: true }],
        ['false', { value: false }],
      ],
      session_data_set: [
        ['demo_1', { key: 'demo_1', value: 'value_1' }],
        ['demo_2', { key: 'demo_2', value: 'value_2' }],
      ],
      session_data_read_all: [
        [null, { value: true }],
      ],
      system_data: [
        [null, { value: true }],
      ],
      get_settings: [
        [null, { value: true }],
      ],
    }



    // console.error('='.repeat(30))
    // console.error(res)


    return res
  }



  make() {

    const wrap = ({ command, name, index, body }) => {
      // name = name ? `: ${name}` : ''

      return {
        id: `default=${index}`,
        group: `Defaults`,
        command,
        name: name || command,
        body,
        fakeBody: body,
        default: true,
      }
    }

    let res = []
    Object.entries(this.list).map(([command, items], index) => {

      items.map(([name, body], i) => {

        const item = wrap({
          command,
          name,
          index: `${index}.${i}`,
          body,
        })

        // console.error('@@@@', item)

        res.push(item)
      })
    })

    return res
  }



}


export default cls.make()