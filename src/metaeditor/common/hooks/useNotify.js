/* Usage

import React from "react";

// hooks
import {useNotify} from 'hooks/'

function Demo(props) {
  const notify = useNotify()

  const sendNotification = (content) => {
    notify.info(content, {key: undefined})
  }

  return (
    <div>

      <button onClick={() => {

        sendNotification((
          <div>
            Some html content
          </div>
        ))

      }}>Normal</button>

    </div>
  )

}

*/

import * as React from 'react';

// libs
// https://www.npmjs.com/package/notistack
// https://www.iamhosseindhv.com/notistack/api
// https://github.com/iamhosseindhv/notistack
import { useSnackbar } from 'notistack';


function useNotify() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const cls = new class {
    constructor() { }

    closeByKey(key) {
      closeSnackbar(key)
    }

    _make(content, options, variant) {

      let makeContent = content

      // Add title for snackbar mui
      if (typeof content === 'object' && options.title) {
        makeContent = {
          ...content,
          title: options.title,
        }
      }

      enqueueSnackbar(makeContent, {
        variant,
        key: undefined, //Unique identifier to reference a snackbar.
        persist: false, //Snackbar stays on the screen, unless it is dismissed (programmatically or through user interaction).
        preventDuplicate: true,
        anchorOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        ...options,
      });
    }

    default(...args) {
      this._make(...args, 'default')
    }

    info(...args) {
      this._make(...args, 'info')
    }

    success(...args) {
      this._make(...args, 'success')
    }

    warning(...args) {
      this._make(...args, 'warning')
    }

    error(...args) {
      this._make(...args, 'error')
    }

  }

  return cls
}

export default useNotify
