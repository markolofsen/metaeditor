import * as React from 'react'

import { NativeDOMDelegate } from "./NativeDOMDelegate";
import * as client from 'unreal-pixel-streaming'

// libs
import parse from 'url-parse'

export const { Logger, EventsClass } = client

// declarations
declare global {
    interface Window {
        RTCPlayer: any
    }
}

// Determine whether a signalling server WebSocket URL was specified at compile-time or if we need to compute it at runtime
interface ClientBase {
    streamingUrl: string;
}

export interface psConfigSchema {
    [key: string]: any,
    enableVerboseLogging: boolean,
    enableSpsAutoplay: boolean,
    startVideoMuted: boolean,
    controlScheme: client.ControlSchemeType,
    suppressBrowserKeys: boolean,
    fakeMouseWithTouches: boolean,
}

export class ClientClass implements ClientBase {
    streamingUrl: string
    events: object
    psConfig: psConfigSchema

    constructor(streamingUrl: string, psConfig: psConfigSchema) {
        this.streamingUrl = streamingUrl
        this.psConfig = psConfig
    }


    init() {

        // if (window.RTCPlayer) return window.RTCPlayer

        // build the websocket endpoint based on the protocol used to load the frontend
        const url_parsed = parse(this.streamingUrl, true);

        // define our signallingServerProtocol to be used based on whether
        // or not we're accessing our frontend via a tls
        let signallingServerProtocol = 'ws:';
        if (url_parsed.protocol === 'https:') {
            signallingServerProtocol = 'wss:';
        }

        const signallingServerAddress = signallingServerProtocol + '//' + url_parsed.hostname

        // Create a config object instance 
        const CreateConfig = (signalingAddress: string, playerElement: string) => {
            let config = new client.Config(signalingAddress, playerElement);

            // Config performer
            const getCfg = (v: string, def: boolean | number) => {
                const cfg = this.psConfig
                if (typeof v === 'undefined' || !cfg.hasOwnProperty(v)) {
                    return def
                }
                return cfg[v]
            }

            client.Config._enableVerboseLogging = getCfg('enableVerboseLogging', false)

            config.enableSpsAutoplay = getCfg('enableSpsAutoplay', true)
            config.startVideoMuted = getCfg('startVideoMuted', false)
            config.controlScheme = getCfg('controlScheme', client.ControlSchemeType.HoveringMouse)
            config.suppressBrowserKeys = getCfg('suppressBrowserKeys', true)
            config.fakeMouseWithTouches = getCfg('fakeMouseWithTouches', true)

            return config;
        }

        // Create a config object
        let config = CreateConfig(signallingServerAddress, "player");

        // Create a Native DOM delegate instance that implements the Delegate interface class
        let delegate = new NativeDOMDelegate(config);

        // Create and return a new webRtcPlayerController instance 
        let RTCPlayer = create(config, delegate);

        // create takes in a delage interface type which our NativeDomDelegate class implements
        function create(config: client.Config, delegate: client.IDelegate) {
            return new client.webRtcPlayerController(config, delegate);
        }

        document.ontouchmove = (event: TouchEvent) => {
            event.preventDefault();
        }

        // Apply client to window
        window.RTCPlayer = RTCPlayer
        return RTCPlayer

    }

}

export const ClientAccess = new class {

    // Quck access to WebRTC object
    get client() {
        const RTCPlayer = window.RTCPlayer

        // Check if WebRTC object connected
        if (!RTCPlayer?.ueDescriptorUi) return null

        return RTCPlayer
    }

    clientCb(cb: Function) {
        if (this.client) cb(this.client)
    }

    connect(): void {
        this.clientCb((cl: any) => {
            cl.delegate.afkConnect()
        })
    }

    close(): void {
        this.clientCb((cl: any) => {
            cl.afkLogic.closeWebSocket()
        })
    }

    emitCommand(command: string, value: any): void {
        if (!this.client) return
        Logger.verboseLog(`emitCommand()\n` + JSON.stringify({ command, value }, null, 4))
        return this.client.ueDescriptorUi.emitCommand(command, value)
    }

    emitCommandSystem(command: string, payload: any): void {
        if (!this.client) return
        Logger.verboseLog(`emitCommandSystem()\n` + JSON.stringify({ command, payload }, null, 4))
        return this.client.ueDescriptorUi.emitCommandSystem(command, payload)
    }

    emitConsole(payload: string): void {
        if (!this.client) return
        Logger.verboseLog(`EmitConsole()\n` + JSON.stringify(payload, null, 4))
        return this.client.ueDescriptorUi.emitConsole(payload)
    }

    // sendEncoderSettings(payload: client.Encoder) {
    //     if (!this.client) return
    //     return this.client.iWebRTCController.sendEncoderSettings(payload)
    // }

    // sendWebRtcSettings(payload: client.WebRTC) {
    //     if (!this.client) return
    //     return this.client.iWebRTCController.sendWebRtcSettings(payload)
    // }

    restartStreamAutomaticity(): void {
        Logger.verboseLog(`restartStreamAutomaticity()`)

        this.clientCb((cl: any) => {
            cl.iWebRTCController.restartStreamAutomaticity();
        })
    }


}

