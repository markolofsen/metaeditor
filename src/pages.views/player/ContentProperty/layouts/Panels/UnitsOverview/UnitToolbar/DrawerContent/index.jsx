import React from 'react';
import PropTypes from 'prop-types';

// context
import { useUnits, useLogic } from '../../../../context/';

// hooks
import { useHelpers } from 'hooks/'


// material
import {
	makeStyles,
	alpha,
	lighten,
} from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';

// components
import ZoomContent from 'components/ZoomContent/'

// blocks
import FavoriteButton from './FavoriteButton'
import UniversalButton from '../../../../components/UniversalButton/'
import Details from './Details'
import DialogForm from '../DialogForm'


const useStyles = makeStyles((theme) => ({

	root: {
		// padding: theme.spacing(2,5),
	},
	inner: {
		display: 'flex',
		'& > [data-li="main"]': {
			width: 370,
			padding: theme.spacing(3, 4),
		},
		'& > [data-li="details"]': {
			overflowY: 'auto',
			maxHeight: '100vh',
			background: `linear-gradient(180deg, ${lighten(theme.palette.background.paper, .05)} 0%, ${theme.palette.background.paper} 100%)`,
			transition: theme.transitions.create(['max-width', 'padding', 'opacity']),
			overflowX: 'hidden',
			padding: theme.spacing(4, 4),
			'&[data-open="false"]': {
				maxWidth: 0,
				opacity: 0,
				paddingLeft: 0,
				paddingRight: 0,
			},
			'&[data-open="true"]': {
				maxWidth: 1000,
				opacity: 1,
			},
		},
	},
	rootList: {
		'& > [data-li="header"]': {
			paddingBottom: theme.spacing(2),
		},
		'& > [data-li="image"]': {
			backgroundColor: theme.palette.background.paper,
			borderRadius: theme.shape.borderRadius,
			border: `solid 1px ${theme.palette.divider}`,
			padding: theme.spacing(2),
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer',
			transition: theme.transitions.create(['border-color']),
			// minHeight: 250,
			'&:hover': {
				borderColor: alpha(theme.palette.divider, .3),
			},
			'& > img': {
				width: '100%',
				maxWidth: 300,
				maxHeight: 250,
			}
		},
		'& > [data-li="actions"]': {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			paddingTop: theme.spacing(2),
			'& > *': {
				flex: 1,
				'&:nth-child(2)': {
					marginLeft: theme.spacing(1),
				}
			}
		},
		'& > [data-li="content"]': {
			padding: theme.spacing(3, 0),
		},
		'& > [data-li="button"]': {
			marginTop: theme.spacing(1),
			'& > *': {
				display: 'flex',
				justifyContent: 'space-between',
			}
		}
	},
	infoList: {
		'& > li': {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			...theme.typography.body2,
			marginTop: theme.spacing(1),
			'& > label': {
				color: theme.palette.text.secondary,
			},
		},
	},
	headerList: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		'& > [data-li="title"]': {
			...theme.typography.h5,
		},
		'& > [data-li="actions"]': {
			display: 'flex',
			alignItems: 'center',
		}
	},

	zoomWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',

		width: '90vmin',
		height: '90vmin',
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius * 3,
		pointerEvents: 'all',
		overflow: 'hidden',
		position: 'relative',
		padding: theme.spacing(2),
		'& [data-img]': {
			width: '90vmin',
			height: '90vmin',
		},
		'& img': {
			width: '100%'
		},
	}

}));


function DrawerContent(props) {
	const classes = useStyles();
	const helpers = useHelpers();
	const units = useUnits();
	const logic = useLogic();


	const [open, setOpen] = React.useState(false)
	const [currentMenu, setCurrentMenu] = React.useState(false)

	const data = units.state.data_units_overview


	// The component instance will be extended
	// with whatever you return from the callback passed
	// as the second argument
	React.useImperativeHandle(props.innerRef, () => ({

		open: () => {
			setOpen(true)
			setTimeout(() => {
				setCurrentMenu('more')
			}, 500)
		},

	}));

	const closeDrawer = () => {
		setOpen(false)
		setCurrentMenu(false)
	}

	const onEnterUnit = async () => {

		await logic.config.PS.enter_apartment(data.unit_key)
		logic.config.actions.changeMenu('units_overview')

		closeDrawer()
	}

	const renderInfo = () => {

		const list = [
			['Price', helpers.custom.toUsd(data.price)],
			['Property Type', data.variant],
			['Area', helpers.custom.toSqFt(data.square)],
			['Floor', data.floor],
			['Bedrooms', data.bedrooms],
			['Bathrooms', data.bathrooms],
		]

		return (
			<ul className={classes.infoList}>
				{list.map(([label, value], index) => (
					<li key={index}>
						<label>
							{label}:
						</label>
						<span>
							{value}
						</span>
					</li>
				))}
			</ul>
		);

	}

	const renderHeader = () => {
		return (
			<ul className={classes.headerList}>
				<li data-li="title">
					{data.label}
				</li>
				<li data-li="actions">

					<UniversalButton
						onClick={() => closeDrawer()}
						iconOn="share"
						tooltip="Share"
						placement="bottom"
						disabled
					/>

					<FavoriteButton unit_key={data.unit_key} />

					<UniversalButton
						onClick={() => closeDrawer()}
						iconOn="close"
						tooltip="Close window"
						placement="bottom"
					/>

				</li>
			</ul>
		)
	}

	const zoomFloorplan = () => {
		return (
			<div className={classes.zoomWrapper2}>
				<img src={data.image_plan_big} />
			</div>
		)
	}

	const renderButton = (state, label) => {
		const choosed = currentMenu === state
		return (
			<Button
				endIcon={<Icon>{choosed ? 'close' : 'chevron_right'}</Icon>}
				fullWidth
				variant={choosed ? 'contained' : 'outlined'}
				onClick={() => setCurrentMenu(c => c ? false : state)}>
				{label}
			</Button>
		)
	}

	const renderInner = () => {

		const is_unit_overview = logic.config.state.current_menu === 'units_overview'

		return (
			<div className={classes.root}>

				<ul className={classes.inner}>
					<li data-li="main">
						<ul className={classes.rootList}>
							<li data-li="header">
								{renderHeader()}
							</li>
							<li data-li="image">
								<ZoomContent
									content={zoomFloorplan()}
									title={data.label}
									className={classes.zoomWrapper}>
									<div data-img>
										<img src={data.image_plan} />
									</div>
								</ZoomContent>
							</li>
							<li data-li="actions">

								<DialogForm unit_key={data.unit_key}>
									{(click) => (
										<Button fullWidth variant="outlined" onClick={click}>
											Contact Us
										</Button>
									)}
								</DialogForm>
								{!is_unit_overview && (
									<Button fullWidth variant="contained" color="secondary" onClick={() => {
										closeDrawer()
										onEnterUnit()
									}}>
										Explore unit
									</Button>
								)}
							</li>
							<li data-li="content">
								{renderInfo()}
							</li>
							{/*
								<li data-li="button">
									{renderButton('plans', 'Expore floor plans')}
								</li>
								*/}
							<li data-li="button">
								{renderButton('more', 'More info')}
							</li>

						</ul>
					</li>

					<li data-li="details" data-open={currentMenu ? true : false}>
						<Details
							data={data}
							unit_key={data.unit_key} />
					</li>

				</ul>

			</div>
		);
	}

	if (!data) {
		return (<div />);
	}

	return (
		<div>
			<Drawer
				anchor="left"
				open={open}
				onClose={() => closeDrawer()}>
				{renderInner()}
			</Drawer>
		</div>
	)
}


DrawerContent.propTypes = {
};

export default React.forwardRef((props, ref) => {
	return (
		<DrawerContent {...props} innerRef={ref} />
	)
})
