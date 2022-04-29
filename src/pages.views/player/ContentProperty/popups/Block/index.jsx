import React from 'react';
import PropTypes from 'prop-types';

// context
import { useLogic } from '../../context/';

// material
import {
	makeStyles,
	useTheme,
	alpha,
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Portal from '@mui/material/Portal';

// components
import JsonDialog from 'components/JsonDialog/'
import DraggableObject from 'components/DraggableObject/'


const useStyles = makeStyles((theme) => ({

	root: {
		position: 'absolute',
		top: 0,//theme.spacing(3),
		left: 0,//theme.spacing(3),
		right: 0,//theme.spacing(3),
		bottom: 0,//theme.spacing(10),
		pointerEvents: 'none',
		zIndex: theme.zIndex.modal,
	},
	rootList: {
		pointerEvents: 'all',
		backgroundColor: theme.palette.background.default,
		borderRadius: theme.shape.borderRadius,
		transition: theme.transitions.create(['box-shadow'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		pointerEvents: 'all',
		width: 280,

		'&[data-active="false"]': {
			boxShadow: theme.shadows[5],
		},
		'&[data-active="true"]': {
			boxShadow: theme.shadows[15],
		},
		'& > [data-li="image"]': {
			backgroundColor: theme.palette.background.paper,
			backgroundRepeat: 'no-repeat',
			backgroundSize: 'cover',
			backgroundPosition: 'center center',
			minHeight: 150,
			cursor: 'pointer',
			transition: theme.transitions.create(['opacity']),
			'&:hover': {
				opacity: .7,
			},
		},
		'& > [data-li="info"]': {
			padding: theme.spacing(2),
		},
		'& > [data-li="actions"]': {
			padding: theme.spacing(0, 2, 2),
		}
	},
	title: {
		cursor: 'move',
		userSelect: 'none',
		padding: theme.spacing(1, 1, 1, 2),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		// borderBottom: 'solid 1px transparent',
		borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
		backgroundColor: alpha(theme.palette.primary.main, .1),
		transition: theme.transitions.create(['border-color', 'background-color'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		'&:hover': {
			backgroundColor: alpha(theme.palette.primary.main, .5),
			// borderBottomColor: theme.palette.divider,
		},
		'& > label': {
			pointerEvents: 'none',
			fontSize: theme.typography.body2.fontSize,
			fontWeight: theme.props.fontWeight.bold,
		},
	},

}));


function Popup({ show, ...props }) {
	const classes = useStyles();
	const logic = useLogic();
	const theme = useTheme()

	const handleClose = () => {
		props.onClose()
	}

	const renderContent = (active = false) => {

		return (
			<ul className={classes.rootList} data-active={active}>
				<li className={classes.title}>
					<label>
						{props.title}
					</label>
					<IconButton size="small" onClick={handleClose}>
						<Icon>close</Icon>
					</IconButton>
				</li>

				{props.image ? (
					<li data-li="image"
						onClick={() => props.onClick()}
						style={{
							backgroundImage: `url(${props.image})`,
							backgroundSize: props.backgroundSize,
						}} />
				) : ''}

				<li data-li="info">
					{props.children}
				</li>
				{props.button && (
					<li data-li="actions">
						<Button
							fullWidth
							variant="contained"
							color="primary"
							onClick={() => {
								props.onClick()
							}} >
							Go into
						</Button>
					</li>
				)}
			</ul>
		)
	}

	const renderInner = (...args) => {
		return (
			<Slide
				direction="down"
				in={show}
				onExited={(node, done) => {
					// setDrag(false)
				}}
				onEntered={(node, done) => {
					// setDrag(true)
				}}>
				{renderContent(...args)}
			</Slide>
		)
	}

	const padding = theme.spacing(2)
	const blockSettings = {
		defaultPosition: { x: padding, y: padding },
		onClose: () => { }
	}

	return (
		<Portal>

			<JsonDialog id="popup-data" data={props.data} />

			<div className={classes.root}>
				<DraggableObject handleClass={classes.title} {...blockSettings} show={show}>
					{({ active }) => renderInner(active)}
				</DraggableObject>
			</div>
		</Portal>
	)
}


Popup.propTypes = {
	data: PropTypes.object,
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	show: PropTypes.bool.isRequired,
	children: PropTypes.any.isRequired,
	image: PropTypes.any,
	button: PropTypes.bool,
	onClick: PropTypes.func,
	backgroundSize: PropTypes.oneOf(['cover', 'contain']),
};

Popup.defaultProps = {
	button: false,
	onClick: () => { },
	backgroundSize: 'cover',
}

export default Popup
