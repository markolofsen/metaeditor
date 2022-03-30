/* Usage

// hooks
import {useWindowSize} from 'hooks/'

function App() {
	const windowSize = useWindowSize();

	return (
		<div>
			{windowSize.width}px / {windowSize.height}px
		</div>
	);
}
*/

import * as React from 'react';

// Hook
function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = React.useState({
		width: undefined,
		height: undefined,
	});

	React.useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state

			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});

			// Set for css
			const doc = document.documentElement
			doc.style.setProperty("--window-width", window.innerWidth + 'px');
			doc.style.setProperty("--window-height", window.innerHeight + 'px');

		}

		// Add event listener
		window.addEventListener("resize", handleResize);

		// Call handler right away so state gets updated with initial window size
		handleResize();


		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount

	const { width, height } = windowSize
	return { width, height }
}

export default useWindowSize
