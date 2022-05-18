
import * as React from "react";
import { ClientAccess } from "../../../client/";



export const useUnrealSettings = (state: any, active: boolean) => {

  React.useEffect(() => {

    if (!active) return

    // const encoderSettings = {
    //   TargetBitrate: -1,
    //   MaxBitrate: 20000000,
    //   MinQP: 0, //-1
    //   MaxQP: 51, //-1
    //   RateControl: 'CBR', //"CBR" | "VBR" | "ConstQP"
    //   FillerData: 0,
    //   MultiPass: 'FULL', //"DISABLED" | "QUARTER" | "FULL";
    // }

    // const webrtcSettings = {
    //   DegradationPref: 'MAINTAIN_FRAMERATE', //"BALANCED" | "MAINTAIN_FRAMERATE" | "MAINTAIN_RESOLUTION";
    //   MinBitrate: 100000,
    //   MaxBitrate: 20000000,
    //   LowQP: 25,
    //   HighQP: 37,
    //   MaxFPS: 60,
    //   FPS: 60,
    // }

    if (!ClientAccess.client) return

    const { Encoder, WebRTC, Console } = state.ueSettings?.onStart

    if (Encoder) {
      ClientAccess.client.sendEncoderSettings(Encoder)
    }

    if (WebRTC) {
      ClientAccess.client.sendWebRtcSettings(WebRTC)
    }

    if (Console) {
      const emitConsole = (payload: string) => ClientAccess.emitConsole(payload)

      // // Disable keys
      // emitConsole(`PixelStreaming.KeyFilter "Escape,Esc"`)

      // Whether to hide the UE application cursor.
      if (typeof Console?.cursor === 'boolean') {
        emitConsole(`PixelStreaming.HideCursor ${Console.cursor.toString()}`)
      }

      // Whether to show PixelStreaming stats on the in-game HUD.
      if (typeof Console?.hudSats === 'boolean') {
        emitConsole(`PixelStreaming.HudStats ${Console.hudSats.toString()}`)
      }

    }


  }, [active])
}


// // Disables the synchronization of audio and video tracks in WebRTC.
// PixelStreaming.WebRTC.DisableAudioSync true

// // Disables transmission of UE audio to the browser.
// // If audio is not required can improve latency in some cases.
// PixelStreaming.WebRTC.DisableTransmitAudio false


// // Disables receiving audio from the browser into UE.
// // If audio is not required can improve latency in some cases.
// PixelStreaming.WebRTC.DisableReceiveAudio false


// // [INCLUDE:#HighQpTrhesholdInfo]
// PixelStreaming.WebRTC.HighQpThreshold 37


// // Only used when PixelStreaming.Encoder.LowQP = -1. Value between 1 and 51. If WebRTC is getting frames below this QP, it will try to make an adaptation decision.
// PixelStreaming.WebRTC.LowQpThreshold 25


// // Maximum bitrate(bps) that WebRTC will not request above.
// // Be careful not to set this value too high, as a local(ideal) network will actually attempt to reach this value.
// PixelStreaming.WebRTC.MaxBitrate 20000000

// // Minimum bitrate(bps) that WebRTC will not request below.
// // Be careful not to set this value too high, otherwise WebRTC will just drop frames.
// PixelStreaming.WebRTC.MinBitrate 100000


// // Start bitrate(bps) that WebRTC will try to begin the stream with.
// // Value must be between Min and Max bitrates.
// PixelStreaming.WebRTC.StartBitrate 10000000


// // The maximum FPS WebRTC will try to capture/encode/transmit.
// PixelStreaming.WebRTC.MaxFps 60



// // [INCLUDE:#DegredationPreferenceInfo]
// PixelStreaming.WebRTC.DegradationPreference "MAINTAIN_FRAMERATE"


// // Specifies the log level of WebRTC.This is useful for debugging WebRTC.
// LogCmds=PixelStreamingWebRTC < LogLevel > Where helpful log levels are: Log, Verbose, VeryVerbose


// // Maximum number of back buffers to use. A value of 0 will not limit the number of back buffers.
// PixelStreaming.Capturer.MaxNumBackBuffers 8

// // Custom capture size to use if PixelStreaming.Capturer.UseBackBufferSize is false.
// PixelStreaming.Capturer.CaptureSize 1920x1080


// // Whether to use back buffer size or a custom size specified by PixelStreaming.Capturer.CaptureSize
// PixelStreaming.Capturer.UseBackBufferSize true



