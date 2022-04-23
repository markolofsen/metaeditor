import * as React from 'react';

// libs
import moment from 'moment'

// hooks
import { useStorage } from 'metalib/common/hooks/'
import { useApi } from '../../../../@common/hooks/'

import defaultCommands from './defaultCommands'


// const defaultCommands = [
//   // command, name, json
//   ['system_sound', 'Sound: on', { enabled: true }],
//   ['system_sound', 'Sound: off', { enabled: false }],
// ].map(([command, name, jsonRequest], id) => ({
//   id: `default=${id}`,
//   group: 'Defaults',
//   command,
//   name,
//   jsonRequest,
//   jsonResponse: jsonRequest,
//   default: true,
// }))



function useCommands() {
  const api = useApi()
  const [commandsList, setCommandsList] = React.useState([])

  React.useEffect(() => {
    // if (commandsList === false) {
    onLoad()
    // }
  }, [])


  const onLoad = async () => {
    await api.getCommandsList().then(res => {

      if (res.ok) {
        // for (let item of res.body) {
        //   addCommand(item.)
        // }
        console.error('@@@res', res.body)
        setCommandsList(res.body)
      }
    })
  }

  // const addCommand = (command, update = true) => {

  //   try {

  //     if (!command?.id) {
  //       window.ps_command_id = window?.ps_command_id + 1 || commandsList.length + 1
  //       command.id = `command=${window.ps_command_id}`
  //     }

  //     setCommandsList(c => ([
  //       command,
  //       ...c,
  //     ]))

  //   } catch (err) {
  //     console.error(err);

  //     return false
  //   }

  //   return true

  // }


  return {
    commandsList,
  };

}

export default useCommands
