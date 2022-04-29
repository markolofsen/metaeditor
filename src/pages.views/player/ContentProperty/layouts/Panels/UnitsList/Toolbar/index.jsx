import React from 'react';
import PropTypes from 'prop-types';

// context
import {
	useLogic,
} from '../../../context/';

// material
import {
	makeStyles,
	alpha,
} from '@mui/material/styles';
import Portal from '@mui/material/Portal';

// components
import SliderVertical from '../../../components/Slider/Vertical'


const useStyles = makeStyles((theme) => ({

	rootList: {
		pointerEvents: 'all',
		backgroundColor: alpha(theme.palette.background.default, .5),
		borderRadius: 100,
		padding: theme.spacing(3, 1),
		zIndex: theme.zIndex.appBar + 5,
		position: 'absolute',
		top: theme.spacing(12),
		right: theme.spacing(2),
		'& > [data-li="slider"]': {
			height: 200,
		}
	},

}));



function ToolbarUnits(props) {
	const classes = useStyles();
	const logic = useLogic();

	const refSliderValue = React.useRef(null)
	const [value, setValue] = React.useState(.5)

	const bind_value = logic.config.PS.cmd.camera_vertical_bind?.data?.value


	React.useEffect(() => {
		if (typeof bind_value.position === 'number') {
			setValue(bind_value.position)
		}
	}, [bind_value.position])


	const handleChange = position => {

		setValue(position)

		clearTimeout(refSliderValue.current)
		refSliderValue.current = setTimeout(() => {
			logic.config.PS.camera_vertical_bind(position)
		}, 500)
	}

	return (
		<Portal>
			<ul className={classes.rootList}>
				<li data-li="slider">
					<SliderVertical
						value={value}
						min={0}
						max={1}
						step={.01}
						onChange={handleChange}
					/>
				</li>
			</ul>
		</Portal>
	);

}


ToolbarUnits.propTypes = {
};

ToolbarUnits.defaultProps = {
};


export default ToolbarUnits
