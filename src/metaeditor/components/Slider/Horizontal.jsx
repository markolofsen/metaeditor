import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from '../../common/styles/'

// material
import Slider from '@mui/material/Slider';



const PrettoSlider = styled.withStyles(Slider, theme => ({
	root: {
		pointerEvents: 'all',
		// color: theme.palette.primary.main,
		color: 'rgba(255,255,255, 1)',
		padding: '0 0 4px',
	},
	disabled: {
		opacity: .7,
	},
	thumb: {
		// '&:focus, &:hover, &$active': {
		// },
	},
	active: {},
	valueLabel: {
		top: -20,
		'& > span': {
			backgroundColor: 'transparent',
			whiteSpace: 'nowrap',
			// fontSize: theme.props.fontSize.small,
		}
	},
	track: {
		height: 1,
		// color: theme.palette.primary.main,
		color: 'rgba(255,255,255, .5)',
	},
	rail: {
		height: 1,
		color: 'rgba(255,255,255,.5)',
	},
}))


// let slider_timer = null

function SliderHorizontal(props) {
	const [value, setValue] = React.useState(props.defaultValue);

	const handleChange = (event, newValue) => {
		setValue(newValue);

		// clearTimeout(slider_timer)
		// slider_timer = setTimeout(() => {
		// 	props.onChange(newValue)
		// }, 100)
		props.onChange(newValue)
	};

	return (
		<PrettoSlider
			disabled={props.disabled}
			step={props.step}
			min={props.min}
			max={props.max}
			value={value}
			onChange={handleChange}
			valueLabelDisplay="off"
			getAriaValueText={(v) => v}
			valueLabelFormat={props.format}
		/>
	);
}


SliderHorizontal.propTypes = {
	onChange: PropTypes.func.isRequired,
	format: PropTypes.func,
	disabled: PropTypes.bool,
	step: PropTypes.number,
	min: PropTypes.number,
	max: PropTypes.number,
};

SliderHorizontal.defaultProps = {};


export default SliderHorizontal
