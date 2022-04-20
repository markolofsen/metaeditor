import React from "react";

// libs
import useOnlineStatus from 'react-online-hook';

// hooks
import { useNotify } from '../../hooks/'

function useOffline() {
  const notify = useNotify()

  const { isOnline } = useOnlineStatus()

  React.useEffect(() => {

    const notifyKey = 'is-offline'

    if (isOnline) {
      notify.closeByKey(notifyKey)
    } else {
      notify.error('You are currently offline!', {
        key: notifyKey,
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
        autoHideDuration: 1000 * 100,
        // resumeHideDuration: 1000 * 10,
      })
    }

  }, [isOnline])

  return;
}

export default useOffline
