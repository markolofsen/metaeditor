/* Usage

// material
import Button from '@mui/material/Button';

// hooks
import {useSound} from 'hooks/'

function Demo() {
  const sound = useSound('http://.../sound.mp3');

  return (
    <div>
      <Button onClick={() => sound.play()}>
        Play sound
      </Button>
    </div>
  );
}
*/

import React from "react";


// libs
// https://www.npmjs.com/package/use-sound
import useSoundLib from 'use-sound';

// Collections
// https://www.zedge.net/find/ringtones/notification%20sounds


function useSound(soundObj) {

  const [playbackRate, setPlaybackRate] = React.useState(.99);
  const [playNow, exposedData] = useSoundLib(soundObj, {
    playbackRate,
    // `interrupt` ensures that if the sound starts again before it's
    // ended, it will truncate it. Otherwise, the sound can overlap.
    interrupt: true,
  });

  const { stop, pause, duration, sound } = exposedData

  const play = () => {
    // setPlaybackRate(playbackRate + .1);

    // Not playing without any click by document
    playNow()
  }

  return {
    play,
    stop, pause, duration, sound,
  };
};


export default useSound
