import * as React from 'react';

import { ClientAccess } from '../../../client/'


export const useResolution = ({ mode = null }: any) => {

	const refTimer = React.useRef<any>(null)

	// Initialize state with undefined width/height so server and client renders match
	const [state, setState] = React.useState<any>({
		width: 0,
		height: 0,
	});


	// Handler to call on window resize
	function handleResize() {

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

	React.useEffect(() => {

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();


		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount



	const cls = new class {

		// will be called after the stream activation
		resize() {
			handleResize()
		}

		// screen resolution options
		async updateWebrtcResolution(width: number, height: number) {

			clearTimeout(refTimer.current)

			// const emitCons = (payload: any) => ClientAccess.emitConsole(payload)
			const emitCmd = (command: string, payload: any) => ClientAccess.emitCommandSystem(command, payload)


			refTimer.current = setTimeout(() => {

				// https://docs.unrealengine.com/5.0/en-US/unreal-engine-pixel-streaming-reference/

				const ui = ClientAccess.client
				// if (ui) ui.sendEncoderMinQP(-1)


				// // Whether to hide the UE application cursor.
				// emitCons('PixelStreaming.HideCursor true')

				// // Whether to show PixelStreaming stats on the in-game HUD.
				// emitCons('PixelStreaming.HudStats true')

				// emitCons('PixelStreaming.Encoder.MinQP -1')
				// emitCons('PixelStreaming.WebRTC.StartBitrate 20000000')
				// emitCons('PixelStreaming.Encoder.RateControl ConstQP')

				// if (ui) {
				// 	ui.sendUpdateVideoStreamSize(width, height)
				// }

				// client.emitConsole(`PixelStreaming.Capturer.UseBackBufferSize 0`)
				// client.emitConsole(`PixelStreaming.Capturer.CaptureSize ${width}x${height}`)
				// client.emitConsole(`r.SetRes ${window.innerWidth}x${window.innerHeight}f`)

				switch (mode) {

					// Set resolution to metaplugin
					case 'command':
						emitCmd('resolution_change', { width, height })
						break

					// Set resolution by native console method
					case 'console' && ui:
						ui.sendUpdateVideoStreamSize(width, height)
						// emitCons('PixelStreaming.Capturer.UseBackBufferSize 0')
						// emitCons(`PixelStreaming.Capturer.CaptureSize ${width}x${height}`)
						break
				}

			}, 500)
		}
	}

	return cls
}
