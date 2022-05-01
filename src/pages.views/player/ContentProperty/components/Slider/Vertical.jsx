import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { styled } from 'metalib/styles'
import Slider from '@mui/material/Slider';
// import Typography from '@mui/material/Typography';


const PrettoSlider = styled.withStyles(Slider, theme => ({
	root: {
		pointerEvents: 'all',
		color: 'rgba(255,255,255, 1)',
		'&$vertical': {
			height: '100%',
		}
	},

	thumb: {
		height: 20,
		width: 20,
		backgroundColor: '#fff',
		// border: '2px solid currentColor',
		'&:focus, &:hover, &$active': {
			boxShadow: 'inherit',
		},
	},
	active: {},
	valueLabel: {
		left: 'calc(-50% + 4px)',
	},
	track: {
		borderRadius: 4,
		backgroundColor: 'transparent',
	},

	rail: {
		height: 18,
		borderRadius: 4,
	},

	vertical: {
		'& $rail': {
			width: 8,
			height: '100%',
			// color: 'rgba(255,255,255,.5)',
			backgroundColor: 'rgba(255,255,255, .1)',
		},
		'& $track': {
			width: 8,
			backgroundColor: 'rgba(255,255,255, .3)',
			// color: 'rgba(255,255,255, .5)',
			border: 0,
		},
		'& $thumb': {
			marginLeft: 0,
			marginBottom: 0,
		}
	}
}))


function VerticalSlider(props) {
	const [value, setValue] = React.useState(props.value)

	const handleChange = (v) => {
		setValue(v)

		props.onChange(v)
	};

	return (
		<PrettoSlider
			orientation="vertical"
			min={props.min}
			max={props.max}
			step={props.step}
			onChange={(event, v) => handleChange(v)}
			ValueLabelComponent={props.ValueLabelComponent}
			// valueLabelDisplay="auto"
			value={props.defaultValue || props.value} />
	);
}

VerticalSlider.propTypes = {
	defaultValue: PropTypes.any,
	value: PropTypes.any.isRequired,
	min: PropTypes.number.isRequired,
	max: PropTypes.number.isRequired,
	step: PropTypes.number.isRequired,
	ValueLabelComponent: PropTypes.object,
	onChange: PropTypes.func.isRequired,
};

VerticalSlider.defaultProps = {
	step: 1,
};

export default VerticalSlider
