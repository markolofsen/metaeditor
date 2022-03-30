/* Usage

// hooks
import {useMedia} from 'hooks/'

function demo() {
	const media = useMedia();
	const isMobile = media.down.sm

	console.warn(media)

	// Response:
	// "up":{"xs":true,"sm":true,"md":true,"lg":false,"xl":false},
	// "down":{"xs":false,"sm":false,"md":true,"lg":true,"xl":true},

	return (
		<div>

			{media.up.sm && (
				<div>Over sm</div>
			)}
			{media.down.sm && (
				<div>Less then sm</div>
			)}

			<pre>
				{JSON.strinigy(media, null, 4)}
			</pre>
		</div>
	)
}
*/

import * as React from 'react';

// material
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';


function useMedia() {
	const theme = useTheme();

	const getMedia = () => {
		let res = {
			up: {},
			down: {},
			only: {},
		}
		for (let i of ['xs', 'sm', 'md', 'lg', 'xl']) {
			res.up[i] = useMediaQuery(theme => theme.breakpoints.up(i))
			res.down[i] = useMediaQuery(theme => theme.breakpoints.down(i))
			res.only[i] = useMediaQuery(theme => theme.breakpoints.only(i))
		}
		return res;
	}


	return getMedia()

}


export default useMedia
