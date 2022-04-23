import * as React from 'react';

export default function useTrigger({ onCommand, onCallback }) {

  React.useEffect(() => {

    document.addEventListener('metaeditor_command', onCommand)
    document.addEventListener('metaeditor_callback', onCallback)

    return () => {
      document.removeEventListener('metaeditor_command', onCommand)
      document.removeEventListener('metaeditor_callback', onCallback)
    };
  }, []);

}