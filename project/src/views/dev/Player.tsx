import React from 'react'

// libs
import { Player, PlayerPropsSchema } from 'pixel-streaming'

const PlayerContext: React.FC<any> = () => {

  const playerConfig: PlayerPropsSchema = {
    // apiKey: '3e9e49c6-60eb-469b-80b6-9a9b53fa7f73',
    metaConfig: {
      showToolbar: true,
      showQuickMenu: true,
      showDevBar: true,
      showOverlay: true,
      notifications: {
        showCommands: true,
        showCallbacks: true,
        placement: 'topStart',
      },
      videoUrl: null,
      issuesUrl: 'https://metaeditor.io/feature-requests/',
    },
    config: {
      secondsToKill: 0,
      secondsToStart: 0,
      autoRestart: true,
    },
    psConfig: {
      enableVerboseLogging: true,
      enableSpsAutoplay: true,
      startVideoMuted: false,
      autoPlayAudio: true,
      controlScheme: 1,
      suppressBrowserKeys: true,
      fakeMouseWithTouches: true,
    },
    ueSettings: {
      Encoder: {
        TargetBitrate: -1,
        MaxBitrate: 20000000,
        MinQP: 0, //-1
        MaxQP: 51, //-1
        RateControl: 'CBR', //"CBR" | "VBR" | "ConstQP"
        FillerData: true,
        MultiPass: 'FULL', //"DISABLED" | "QUARTER" | "FULL";
      },
      WebRTC: {
        DegradationPref: 'MAINTAIN_FRAMERATE', //"BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION";
        MinBitrate: 100000,
        MaxBitrate: 20000000,
        LowQP: 25,
        HighQP: 37,
        MaxFPS: 60,
        FPS: 60,
      },
      Console: {
        cursor: true,
        hudSats: true,
      }
    }
  }

  return (
    <Player {...playerConfig} />
  )

}


export default PlayerContext
