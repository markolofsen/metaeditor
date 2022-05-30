import * as React from 'react';

// ui
import { media } from '../assets/styled';

// hooks
import { useEventListener } from './useEventListener'


export const useMedia = () => {

	const defaultSizes = {
		xs: false,
		sm: false,
		md: false,
		lg: false,
		xl: false,
	}

	const [size, setSize] = React.useState<any>(defaultSizes);

	const change = (key: string) => {
		setSize({ defaultSizes, [key]: true })
	}

	// Handler to call on window resize
	const handleResize = () => {
		const width = window.innerWidth

		if (width > media.sizes.xl) { // > 1536
			change('xl')
		}
		else if (width > media.sizes.lg) { // > 1200
			change('lg')
		}
		else if (width > media.sizes.md) { // > 900
			change('md')
		}
		else if (width > media.sizes.sm) { // > 600
			change('sm')
		} else {
			change('xs')
		}

		// console.log('@@@size', size)
	}

	// useEventListener('resize', handleResize)

	React.useEffect(() => {
		window.addEventListener("resize", () => handleResize());
		handleResize();

		return () => window.removeEventListener("resize", () => handleResize());
	}, []);

	return size
}
