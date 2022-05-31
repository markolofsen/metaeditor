import * as React from 'react';

import { ClientAccess } from '../../../client/'

// hooks
import { useEventListener } from '../../../hooks/useEventListener';


export const useResolution = (ConsoleSettings: any) => {

	const refTimer = React.useRef<any>(null)

	// Initialize state with undefined width/height so server and client renders match
	const [state, setState] = React.useState<any>({
		width: 0,
		height: 0,
	});

	// Handler to call on window resize
	const handleResize = () => {

		// Set window width/height to state

		const width = window.innerWidth
		const height = window.innerHeight

		setState({ width, height });

		// Set for css
		const doc = document.documentElement
		doc.style.setProperty("--window-width", window.innerWidth + 'px');
		doc.style.setProperty("--window-height", window.innerHeight + 'px');

		// Set object-fit for player dependes on highest resolution side
		const objectFit = width > height ? 'unset' : 'fill'
		doc.style.setProperty("--player-object-fit", objectFit);

		// Update resolution of pixel-streaming
		cls.updateWebrtcResolution(width, height)

	}

	useEventListener('resize', handleResize, window)


	const cls = new class {

		// will be called after the stream activation
		resize() {
			handleResize()
		}

		// screen resolution options
		async updateWebrtcResolution(width: number, height: number) {

			clearTimeout(refTimer.current)

			const emitConsole = (payload: any) => ClientAccess.emitConsole(payload)
			const emitCmd = (command: string, payload: any) => ClientAccess.emitCommandSystem(command, payload)

			refTimer.current = setTimeout(() => {

				// https://docs.unrealengine.com/5.0/en-US/unreal-engine-pixel-streaming-reference/

				// if (ui) ui.sendEncoderMinQP(-1)

				// emitCons('PixelStreaming.Encoder.MinQP -1')
				// emitCons('PixelStreaming.WebRTC.StartBitrate 20000000')
				// emitCons('PixelStreaming.Encoder.RateControl ConstQP')

				const RTCPlayer = ClientAccess.client

				if (!ConsoleSettings) return


				// Whether to hide the UE application cursor.
				if (typeof ConsoleSettings.cursor === 'boolean') {
					emitConsole(`PixelStreaming.HudStats ${ConsoleSettings.cursor.toString()}`)
				}

				// Whether to show PixelStreaming stats on the in-game HUD.
				if (typeof ConsoleSettings.hudSats === 'boolean') {
					emitConsole(`PixelStreaming.HudStats ${ConsoleSettings.hudSats.toString()}`)
				}

				switch (ConsoleSettings.mode) {

					// Set resolution to metaplugin
					case 'command':
						emitCmd('resolution_change', { width, height })
						break

					// Set resolution by native console method
					case 'console':
						if (RTCPlayer) {
							RTCPlayer.ueDescriptorUi.sendUpdateVideoStreamSize(width, height)
						}
						// emitConsole(`r.SetRes ${width}x${height}f`)
						// emitConsole('PixelStreaming.Capturer.UseBackBufferSize 0')
						// emitConsole(`PixelStreaming.Capturer.CaptureSize ${width}x${height}`)
						break
				}

			}, 500)
		}
	}

	return cls
}
