import * as React from 'react';

// libs
import moment from 'moment'

// hooks
import { useStorage } from 'metalib/common/hooks/'

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
  const storage = useStorage()
  const [mounted, setMounted] = React.useState(false)
  const [commandsList, setCommandsList] = React.useState([
    // default, group, jsonRequest, jsonResponse, name, slug

    // Preload default commands
    ...defaultCommands,
  ])

  React.useEffect(() => {
    if (!mounted) {
      setMounted(true)
      STORAGE.preload()
    }
  }, [])

  const STORAGE = new class {
    allow(command) {
      if (command?.default === false) {
        return true;
      }
      return false;
    }
    preload() {
      for (let key in localStorage) {
        if (key.startsWith('command=')) {

          const cmdValue = storage.getItem(key, 'local')

          // console.error('preload key', key, '=', cmdValue);

          const success = updateCommand(cmdValue)
          if (!success) {
            addCommand(cmdValue, false)
          }

        }
      }
    }
    update(command) {
      // console.error('@STORAGE.update', command);

      if (this.allow(command)) {
        storage.setItem(command.id, command, 'local')
      }
    }
    delete(command) {
      // console.error('@storageDelete', command);

      if (this.allow(command)) {
        storage.removeItem(command.id, 'local')
      }
    }
  }


  const addCommand = (command, update = true) => {

    let isError = false

    try {

      if (!command?.id) {
        window.ps_command_id = window?.ps_command_id + 1 || commandsList.length + 1
        command.id = `command=${window.ps_command_id}`
      }

      if (typeof command.default === 'undefined') {
        command.default = false
      }

      if (update) {
        STORAGE.update(command)
      }

      setCommandsList(c => ([
        command,
        ...c,
      ]))

    } catch (err) {
      console.error(err);

      isError = true
    }

    return isError;

  }

  const updateCommand = (command) => {

    let commandExist = false
    setCommandsList(list => {
      for (let i in list) {
        const item = list[i]
        if (item.id == command.id) {
          list[i] = command
          commandExist = true
          break;
        }
      }

      return [...list];
    })

    if (commandExist) {
      STORAGE.update(command)
      return true;

    } else {
      // console.error('Command not exist');
      return false;
    }

  }

  const deleteCommand = (command) => {

    STORAGE.delete(command)

    setCommandsList(list => {
      list = list.filter(item => item.id !== command.id)
      return [...list];
    })
  }

  const exportData = () => {

    function downloadObjectAsJson(exportObj, exportName) {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

    const list = commandsList.filter(i => !i.default)
    downloadObjectAsJson(list, 'metaeditor_' + moment().format())
  }

  const importData = (payload) => {

    const isArray = Array.isArray(payload)
    if (!isArray) {
      alert('Format error!')
      return false;
    }

    let isError = false
    payload.forEach((item, i) => {
      isError = addCommand(item)
    });

    if (isError) {
      alert('Format error!')
      return false;
    }

    return true;

  }

  return {
    commandsList,
    addCommand,
    updateCommand,
    deleteCommand,
    exportData,
    importData,
  };

}

export default useCommands
