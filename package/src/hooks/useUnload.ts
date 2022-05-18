/*
Usage:

// hooks
import {useUnload} from 'hooks/'


const MyComponent = () => {
  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  });

  return (
    <div>
      Some content
    </div>
  );
};

*/

import * as React from 'react';

export const useUnload = (fn: any) => {
  const cb = React.useRef<any>(fn); // init with fn, so that type checkers won't assume that current might be undefined

  React.useEffect(() => {
    cb.current = fn;
  }, [fn]);

  const onUnload = (...args: any) => cb.current?.(...args);

  React.useEffect(() => {

    return () => {
      cls.deactivate()
    };

  }, []);

  const cls = new class {
    constructor() { }

    activate() {
      window.addEventListener("beforeunload", onUnload);
    }
    deactivate() {
      window.removeEventListener("beforeunload", onUnload)
    }
  }

  return cls
};

