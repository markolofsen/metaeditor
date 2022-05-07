import * as React from 'react';
import PropTypes from 'prop-types';

// context
import { useUnits, useCommands } from '../../../../context/';


// hooks
import { useMedia } from 'metalib/common/hooks/'
import { format } from 'metalib/common/helpers/'

// material
import { makeStyles, alpha } from 'metalib/styles'
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
// import Collapse from '@mui/material/Collapse';

// blocks
import Tooltip from '../../../../components/Tooltip/'
import DialogForm from './DialogForm'


const useStyles = makeStyles((theme) => ({

	rootList: {
		position: 'fixed',
		// zIndex: theme.zIndex.appBar+10,
		left: theme.spacing(2),
		top: theme.spacing(2),
		display: 'flex',
		'& > li': {
			marginRight: theme.spacing(1),
			position: 'relative',
		},
		'& > [data-li="short"]': {
			display: 'none',
			[theme.breakpoints.down('xs')]: {
				display: 'block',
			},
		},
		'& > [data-li="details"]': {
			[theme.breakpoints.down('xs')]: {
				display: 'none',
			},
		},
		'& > [data-li="action"]': {
			[theme.breakpoints.down('md')]: {
				display: 'none',
			},
		},
	},
	button: {

		minWidth: 50,
		minHeight: 50,
		borderRadius: 10,
		boxShadow: theme.shadows[2],

		'&[data-color="primary"]': {
			backgroundColor: theme.palette.primary.main,
			color: '#fff',
			'&:hover': {
				backgroundColor: theme.palette.primary.light,
			},
		},
		'&[data-variant="short"]': {
			color: '#fff',
			padding: theme.spacing(0, 2),
		},
		'&[data-variant="book"]': {
			// ...
		},
	},

	headerList: {
		padding: theme.spacing(0, 1, 0, 1.5),
		display: 'flex',
		alignItems: 'center',
		'& > [data-li="title"]': {
			marginRight: theme.spacing(2),
			color: theme.palette.text.secondary,
			textTransform: 'capitalize',
		},
		'& > [data-li="price"]': {
			marginRight: theme.spacing(2),
			// fontWeight: theme.props.fontWeight.bold,
		},
		'& > [data-li="icon"]': {
			display: 'flex',
			alignItems: 'center'
		},
	},

	popover: {
		// zIndex: -1,
		position: 'absolute',
		marginTop: 3,
		left: 0,
		right: 0,

		backgroundColor: theme.palette.background.paper,
		borderRadius: 10,
		// borderRadius: `0 0 10px 10px`,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(0, 2.3),
		cursor: 'default',
		'& > div': {
			overflowY: 'hidden',
			transition: theme.transitions.create(['max-height', 'padding', 'opacity']),
		},
		'&[data-show="false"]': {
			// padding: theme.spacing(2, 2.3),
			'& > div': {
				maxHeight: 0,
				opacity: 0,
			}
		},
		'&[data-show="true"]': {
			'& > div': {
				paddingTop: theme.spacing(2),
				paddingBottom: theme.spacing(2),
				maxHeight: 500,
			}
		},
	},

	innerList: {
		'& > li': {
			marginTop: theme.spacing(.2),
			...theme.typography.subtitle2,
			'&:first-child': {
				marginTop: 0,
			}
		},
		'& [data-li="item"]': {
			display: 'flex',
			alignItems: 'center',
			'& > label': {
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1)
			},
			'& [data-icon]': {
				fontSize: theme.typography.htmlFontSize,
				marginRight: theme.spacing(1),
			}
		},
		'& [data-list="icons"]': {
			marginTop: theme.spacing(1),
			display: 'flex',
			'& > li': {
				marginRight: theme.spacing(2)
			}
		}
	},


}));


function Widget(props) {
	const classes = useStyles();
	const media = useMedia();
	const units = useUnits();
	const commands = useCommands();

	const [show, setShow] = React.useState(false)

	const data = units.state.data_units_overview

	const renderPopover = () => {
		if (!show) return <div />;

		return (
			<div className={classes.popover}>
				{props.children}
			</div>
		)
	}

	const renderInner = () => {
		return (
			<ul className={classes.innerList}>
				<li>
					<ul>
						<li data-li="item">
							<label>
								Area:
							</label>
							<span>
								{data.square}
							</span>
						</li>
						<li data-li="item">
							<label>
								Floor:
							</label>
							<span>
								{data.floor}
							</span>
						</li>
					</ul>
				</li>
				<li>
					<ul data-list="icons">
						<li data-li="item">
							<Icon data-icon>bed</Icon>
							<span>
								{data.bedrooms}
							</span>
						</li>
						<li data-li="item">
							<Icon data-icon>shower</Icon>
							<span>
								{data.bathrooms}
							</span>
						</li>
					</ul>
				</li>
			</ul>
		)
	}

	if (!data) {
		return (<div />);
	}

	return (
		<ul className={classes.rootList}>
			<li>
				<Tooltip placement="bottom" value="Back to building">
					<Button className={classes.button} data-color="primary" onClick={() => {
						commands.menu.changeMenu('units')
					}}>
						<Icon>arrow_back</Icon>
					</Button>
				</Tooltip>
			</li>
			<li data-li="short">
				<Button
					startIcon={<Icon>menu_open</Icon>}
					className={classes.button} data-variant="short" data-color="primary" onClick={props.onClick}>
					Info
				</Button>
			</li>
			<li data-li="details">
				<Button
					component="div"
					className={classes.button} data-color="primary"
					onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}
					onClick={props.onClick}>
					<ul className={classes.headerList}>
						<li data-li="title">
							{data.label}
						</li>
						<li data-li="price">
							{format.money(data.price, '$')}
						</li>
						<li data-li="icon">
							<Icon>expand_more</Icon>
						</li>
					</ul>
				</Button>
				<div className={classes.popover} data-show={show}>
					<div>
						{renderInner()}
					</div>
				</div>
			</li>
			<li data-li="action">
				<DialogForm unit_key={data.unit_key}>
					{(click) => (
						<Button className={classes.button} data-variant="book" variant="contained" color="secondary" onClick={click}>
							Book now
						</Button>
					)}
				</DialogForm>
			</li>
		</ul>
	);
}


Widget.propTypes = {
	onClick: PropTypes.func.isRequired,
};

Widget.defaultProps = {
}

export default Widget
