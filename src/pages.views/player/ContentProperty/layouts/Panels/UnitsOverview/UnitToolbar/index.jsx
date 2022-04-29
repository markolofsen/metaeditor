import React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'api/'

// material
import {
	makeStyles,
} from '@mui/material/styles';
import Portal from '@mui/material/Portal';


// blocks
import Block from './Block'
import DrawerContent from './DrawerContent/'


const useStyles = makeStyles((theme) => ({

	root: {
		transition: theme.transitions.create(['opacity'], {
			easing: theme.transitions.easing.sharp,
			duration: 1000, //theme.transitions.duration.leavingScreen,
		}),
		'&[data-show="false"]': {
			opacity: 0,
			pointerEvents: 'none',
		},
	},

}));


function UnitToolbar(props) {
	const classes = useStyles();

	const refDrawerContent = React.useRef(null)

	const openDrawer = () => {
		refDrawerContent.current.open()
	}

	return (
		<div>
			<DrawerContent ref={refDrawerContent} />
			<Portal>
				<div className={classes.root} data-show={props.show}>
					<Block onClick={openDrawer} />
				</div>
			</Portal>
		</div>
	);
}


UnitToolbar.propTypes = {
	show: PropTypes.bool.isRequired,
};

UnitToolbar.defaultProps = {
}

export default UnitToolbar
