import * as React from "react"


const initialState: any = {
  apiKey: null,
  buildId: null,
  devBar: {
    slug: null,
  },
  sessionData: null,
  metaData: null,
  metaConfig: {
    showToolbar: true,
    showQuickMenu: false,
    showDevBar: true,
    showOverlay: true,
    notifications: {
      showCommands: true,
      showCallbacks: true,
      placement: 'topStart',
    },
    videoUrl: null,
    issuesUrl: null,
  }
};

const KEY = {
  UPDATE: 'UPDATE',
  UPDATE_DEVBAR: 'UPDATE_DEVBAR',
  UPDATE_METACONFIG: 'UPDATE_METACONFIG',
  UPDATE_NOTIFICATION_SETTINGS: 'UPDATE_NOTIFICATION_SETTINGS',
  UPDATE_SESSION_DATA: 'UPDATE_SESSION_DATA',
}


const reducer = (state: any, action: any): any => {
  const { type, payload: anValue } = action;
  // console.log(state);

  if (type === KEY.UPDATE) {

    return { ...state, ...anValue };

  } else if (type === KEY.UPDATE_DEVBAR) {
    state.devBar = {
      ...state.devBar,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_METACONFIG) {
    state.metaConfig = {
      ...state.metaConfig,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_NOTIFICATION_SETTINGS) {
    state.metaConfig.notifications = {
      ...state.metaConfig.notifications,
      ...anValue,
    }

    return { ...state };

  } else if (type === KEY.UPDATE_SESSION_DATA) {
    state.sessionData = {
      ...state.sessionData,
      ...anValue,
    }

    return { ...state };
  }

  return state;
}



export const useDispatch: any = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const cls = new class {

    update(payload: JSON) {
      dispatch({ type: KEY.UPDATE, payload })
    }

    updateDevBar(payload: JSON) {
      dispatch({ type: KEY.UPDATE_DEVBAR, payload })
    }

    updateMetaConfig(payload: JSON) {
      dispatch({ type: KEY.UPDATE_METACONFIG, payload })
    }

    updateNotificationSettings(payload: JSON) {
      dispatch({ type: KEY.UPDATE_NOTIFICATION_SETTINGS, payload })
    }

    updateSessionData(payload: JSON) {
      dispatch({ type: KEY.UPDATE_SESSION_DATA, payload })
    }

  }


  return [state, cls]
}

