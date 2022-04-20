import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import Slider from '@mui/material/Slider';


const RootList = styled.ul(theme => ({
	pointerEvents: 'all',
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	'& > [data-li-value]': {
		whiteSpace: 'nowrap',
		flex: '1 0 50px',
		maxWidth: 50,
	},
	'& > [data-li-value="left"]': {
		textAlign: 'right',
	},
	'& > [data-li-value="right"]': {
	},
	'& > [data-li="slider"]': {
		flex: 1,
		// flex: '1 0 100px',
		// maxWidth: 100,
		margin: theme.spacing(0, 2),
	}
}))


const PrettoSlider = styled.withStyles(Slider, theme => ({
	root: {
		// color: theme.palette.primary.main,
		color: 'rgba(255,255,255, 1)',
		padding: theme.spacing(0, 0, '4px'),
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


let slider_interval = null

function SliderInterval(props) {
	const {
		intervals,
		min,
		max,
	} = props

	const [value, setValue] = React.useState(intervals);

	const handleChange = (event, newValue) => {
		setValue(newValue);

		clearTimeout(slider_interval)
		slider_interval = setTimeout(() => {
			props.onChange(newValue)
		}, 500)
	};

	const sliderMin = typeof min === 'number' ? min : intervals[0]
	const sliderMax = typeof max === 'number' ? max : intervals[1]

	return (
		<RootList>
			<li data-li-value="left">
				{props.format(value[0])}
			</li>
			<li data-li="slider">
				<PrettoSlider
					step={props.step || (sliderMax || 1) / 100}
					min={sliderMin}
					max={sliderMax}
					value={value}
					onChange={handleChange}
					valueLabelDisplay="off"
					getAriaValueText={(v) => v}
					valueLabelFormat={v => props.format(v)}
				/>
			</li>
			<li data-li-value="right">
				{props.format(value[1])}
			</li>
		</RootList>
	);
}


SliderInterval.propTypes = {
	intervals: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number,
	format: PropTypes.func.isRequired,
};

SliderInterval.defaultProps = {};


export default SliderInterval
