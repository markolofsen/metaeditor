/* Usage

// hooks
import {useAnalytics} from 'hooks/'

function demo() {
	const analytics = useAnalytics();

	return (
		<div />
	)
}

*/


import * as React from 'react';

// hooks
import { useRouter } from 'next/router'

// libs
// https://www.npmjs.com/package/react-ga4
import ReactGA from "react-ga4";


function useAnalytics(trackingId) {
	const router = useRouter()

	// ------ Track navigation with Google Analytics
	React.useEffect(() => {

		const handleRouteChange = (url) => {
			ReactGA.send({ hitType: 'pageview', page: url });
		};

		router.events.on('routeChangeComplete', handleRouteChange);
		return () => {
			router.events.off('routeChangeComplete', handleRouteChange);
		};
	}, [router.events]);
	// ------ //

	// Start
	React.useEffect(() => {
		cls.init()
	}, [])

	const cls = new class {
		constructor() { }

		init() {

			// Multiple products (previously known as trackers)
			ReactGA.initialize([
				{
					trackingId,
					// gaOptions: {...}, // optional
					// gtagOptions: {...}, // optional
				},
				// {
				// 	trackingId: "your second GA measurement id",
				// },
			]);

		}

		// event() {
		// 	// Send a custom event
		// 	ReactGA.event({
		// 		category: "your category",
		// 		action: "your action",
		// 		label: "your label", // optional
		// 		value: 99, // optional, must be a number
		// 		nonInteraction: true, // optional, true/false
		// 		transport: "xhr", // optional, beacon/xhr/image
		// 	});
		// }

	}

	return cls;
}

export default useAnalytics
