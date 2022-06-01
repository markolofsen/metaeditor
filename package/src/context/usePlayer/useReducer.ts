import * as React from "react"

// pixel-streaming
import { EventsClass } from '../../client/'

// libs
import moment from 'moment';


const initialState: any = {
  commands_list: [],
  callbacks_list: [],
  config: {
    streamingUrl: null,
    secondsToKill: null,
    secondsToKillLeft: null,
    secondsToStart: null,
    autoRestart: null,
  },
  psConfig: null,
  ueSettings: {
    initial: null,
    onStart: null,
  },
  playerSettings: {
    volume: 1,
  },
  webrtcData: {
    status: null,
    statusUpdatedAt: null,
    errorCode: null,
    autoplaySupport: null,
  },
  mouseEvent: {
    moving: false,
  },
};

const KEY = {
  UPDATE: 'UPDATE',
  UPDATE_CONFIG: 'UPDATE_CONFIG',
  UPDATE_PS_CONFIG: 'UPDATE_PS_CONFIG',
  UPDATE_UE_SETTINGS_INITIAL: 'UPDATE_UE_SETTINGS_INITIAL',
  UPDATE_UE_SETTINGS_ONSTART: 'UPDATE_UE_SETTINGS_ONSTART',
  UPDATE_PLAYER_SETTINGS: 'UPDATE_PLAYER_SETTINGS',
  WEBRTC_STATUS: 'WEBRTC_STATUS',
  COMMANDS_LIST: 'COMMANDS_LIST',
  CALLBACKS_LIST: 'CALLBACKS_LIST',
  COMMAND_CONFIRMATION: 'COMMAND_CONFIRMATION',
  MOUSE_EVENT: 'MOUSE_EVENT',
}


function reducer(state: any, action: any) {
  const { type, payload: anValue } = action;
  // console.log(state);

  if (type === KEY.UPDATE) {

    return { ...state, ...anValue };

  } else if (type === KEY.UPDATE_CONFIG) {
    state.config = {
      ...state.config,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_PS_CONFIG) {
    state.psConfig = {
      ...state.psConfig,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_UE_SETTINGS_INITIAL) {
    state.ueSettings.initial = {
      ...state.ueSettings.initial,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_UE_SETTINGS_ONSTART) {
    state.ueSettings.onStart = {
      ...state.ueSettings.onStart,
      ...anValue,
    }

    return { ...state };


  } else if (type === KEY.UPDATE_PLAYER_SETTINGS) {

    state.playerSettings = {
      ...state.playerSettings,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.WEBRTC_STATUS) {

    // Show errorCode only in cases when status is error||disconnected
    const status = EventsClass.webrtcStatusList
    if (![status.disconnected, status.error].includes(anValue?.status)) {
      anValue.errorCode = null
    }

    // Checking autoplay support
    if (anValue?.status == status.initialized_no_autoplay) {
      anValue.status = status.initialized
      anValue.autoplaySupport = false
    } else if (anValue?.status == status.initialized) {
      anValue.autoplaySupport = true
    }

    state.webrtcData = {
      ...state.webrtcData,
      ...anValue,
      statusUpdatedAt: moment().utc()
    }

    return { ...state };

  } else if (type === KEY.COMMANDS_LIST) {
    anValue.confirmed = false
    return eventInjection(state, 'commands_list', anValue)

  } else if (type === KEY.CALLBACKS_LIST) {
    return eventInjection(state, 'callbacks_list', anValue)

  } else if (type === KEY.COMMAND_CONFIRMATION) {
    return commandConfirmation(state, anValue)

  } else if (type === KEY.MOUSE_EVENT) {

    const key = anValue?.variant
    if (key) {

      if (key === 'moveStart') {
        state.mouseEvent.moving = true
        return { ...state };
      } else if (key === 'moveStop') {
        state.mouseEvent.moving = false
        return { ...state };
      }

    }

  }

  return state;
}


// Mark command as confirmed by callback
const commandConfirmation = (state: any, verification_id: any) => {
  for (let i in state.commands_list) {
    const item = state.commands_list[i]
    if (item?.verification_id === verification_id) {
      state.commands_list[i].confirmed = true
      return { ...state }
    }
  }

  return state
}


// Add item if verification_id doesnt exist in state
const eventInjection = (state: any, key: string, anValue: any) => {
  const list = state[key] || []

  // Dont save system commands from emitCommandSystem()
  if (!anValue?.verification_id || anValue?.initiator === 'system') {
    return state
  }

  let allow = true
  for (let item of list) {
    if (!item?.verification_id || !anValue?.verification_id) {
      allow = false
    }
    if (item.verification_id == anValue.verification_id) {
      allow = false
      break;
    }
  }

  if (allow) {
    const res = [anValue, ...list].filter((o, index) => index < 100)
    state[key] = res
    window[key] = res // hack for emitAsyncCommand

    return { ...state }
  }

  return state
}



const parseJson = (data: any) => {
  try {
    return JSON.parse(data)
  } catch (err) {
    console.error('@@@cant parse json', data)
  }
  return undefined
}


export const useDispatch = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  /**
   * Events useCallback's wrapper for state updates
   */
  const eventCommand = React.useCallback(({ detail }: any) => {
    const payload = parseJson(detail)
    dispatch({ type: KEY.COMMANDS_LIST, payload })
  }, [state]);

  const eventCallbacks = React.useCallback(({ detail }: any) => {
    const payload = parseJson(detail)
    cls.commandConfirmation(payload?.verification_id)
    dispatch({ type: KEY.CALLBACKS_LIST, payload })
  }, [state]);

  const eventMouse = React.useCallback(({ detail }: any) => {
    const payload = detail
    dispatch({ type: KEY.MOUSE_EVENT, payload })
  }, [state]);

  const eventWebrtcStatus = React.useCallback(({ detail }: any) => {
    cls.updateWebrtcData(detail)
  }, [state]);

  const eventUeSettingsInitial = React.useCallback(({ detail }: any) => {
    const payload = detail
    dispatch({ type: KEY.UPDATE_UE_SETTINGS_INITIAL, payload })
  }, [dispatch]);

  const cls = new class {

    update(payload: any) {
      dispatch({ type: KEY.UPDATE, payload })
    }

    updateConfig(payload: any) {
      dispatch({ type: KEY.UPDATE_CONFIG, payload })
    }

    updatePsConfig(payload: any) {
      dispatch({ type: KEY.UPDATE_PS_CONFIG, payload })
    }

    updateUeSettingsOnStart(payload: any) {
      dispatch({ type: KEY.UPDATE_UE_SETTINGS_ONSTART, payload })
    }

    updatePlayerSettings(payload: any) {
      dispatch({ type: KEY.UPDATE_PLAYER_SETTINGS, payload })
    }

    commandConfirmation(payload: any) {
      dispatch({ type: KEY.COMMAND_CONFIRMATION, payload })
    }

    updateWebrtcData(payload: any) {
      dispatch({ type: KEY.WEBRTC_STATUS, payload })
    }
  }

  const eventHandler = {
    eventCommand,
    eventCallbacks,
    eventMouse,
    eventWebrtcStatus,
    eventUeSettingsInitial,
  }

  return [state, cls, eventHandler]
}

