import React from "react";

// hooks
import { helpers } from '../../common/'

// context
import { usePlayer } from '../../context/';


function useSignal(props) {
	const player = usePlayer()

	const bitrate = player.state.aggregated_stats?.bitrate || 0
	const bytesReceived = player.state.aggregated_stats?.bytesReceived || 0

	const getStrength = () => {
		if (bitrate < 1000) {
			return 1;
		} else if (bitrate < 3000) {
			return 2;
		} else {
			return 3;
		}
	}

	const bitrate_hint = helpers.format.formatNumber(bitrate, {
		decimal: 0,
		separator: '.',
	})

	const received_hint = helpers.format.formatBytes(bytesReceived)

	return {
		strength: getStrength(),
		bitrate_hint,
		received_hint,
	};

}

export default useSignal
