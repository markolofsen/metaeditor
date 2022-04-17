/* Usage
https://www.npmjs.com/package/react-device-detect

// hooks
import {getDevice} from 'hooks/'

function demo() {

	return (
		<div>
			{getDevice.isMobile && 'isMobile'}
			<br />
			{getDevice.isDesktop && 'isDesktop'}
		</div>
	)
}

*/

import * as React from 'react';

// libs
// import * as detect from 'react-device-detect';
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';

export default {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile,
}