import React from 'react';
import PropTypes from 'prop-types';

// api
import ApiClass from 'api/methods/'

// context
import { useLogic, useUnits } from '../context/';

// hooks
import { useHelpers } from 'hooks/'

// material
import {
	makeStyles,
} from '@mui/material/styles';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

// components
import Tooltip from '../components/Tooltip/'

// blocks
import Block from './Block/'
import DrawerContent from '../panels/UnitsOverview/UnitToolbar/DrawerContent/'



const useStyles = makeStyles((theme) => ({

	rootList: {
		'& > li': {
			marginTop: theme.spacing(.2),
			...theme.typography.subtitle2,
			'&:first-child': {
				marginTop: 0,
			}
		},
		'& > [data-li="item"]': {
			display: 'flex',
			justifyContent: 'space-between',
			fontSize: theme.typography.body2.fontSize,
			marginBottom: theme.spacing(1.5),
			'& > label': {
				color: theme.palette.text.secondary,
			},
			'& > span': {
				// fontWeight: theme.props.fontWeight.bold,
			}
		},
		'& > [data-li="drawer"]': {
			marginTop: theme.spacing(2),
		}
	},

	infoList: {
		marginTop: theme.spacing(2),
		display: 'flex',
		justifyContent: 'space-around',
		margin: theme.spacing(0, -1),
		'& > li': {
			margin: theme.spacing(1),
			fontSize: theme.props.fontSize.small,
			'& [data-row]': {
				display: 'flex',
				alignItems: 'center',
				whiteSpace: 'nowrap',
				'& > [data-icon]': {
					marginRight: theme.spacing(.5),
					fontSize: theme.props.fontSize.normal,
					color: theme.palette.text.secondary,
				}
			}
		}
	},

}));


function Popup(props) {
	const classes = useStyles();
	const logic = useLogic();
	const units = useUnits();
	const helpers = useHelpers()

	const refDrawerContent = React.useRef(null)

	const [data, setData] = React.useState(false)

	/* OPEN-CLOSE popup */

	// const cmd_caller = logic.config.PS.callback_caller
	const cmd_loading = logic.config.PS.callback_loading
	const cmd_data = logic.config.PS.cmd.select_apartment?.data
	const cmd_slug = cmd_data?.value.slug

	React.useEffect(() => {

		return () => {
			setData(false)
			logic.config.PS.cmd.select_apartment.reset()
		}
	}, [])

	React.useEffect(() => {

		if (!cmd_slug || cmd_loading) {
			setData(false)
			return;
		}

		ApiClass().vec.vec_overlay.units_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})

	}, [cmd_loading, cmd_slug])


	const renderContent = () => {
		if (!data) return;

		const renderInfo = () => {

			const list = [
				['Bedrooms', 'bed', data.bedrooms],
				['Bathrooms', 'shower', data.bathrooms],
				['Floor', 'height', data.floor],
				['Area', 'photo_size_select_small', helpers.custom.toSqFt(data.square)],
			]

			return (
				<ul className={classes.infoList}>
					{list.map(([label, icon, value], index) => (
						<li key={index}>
							<Tooltip placement="bottom" value={label}>
								<div data-row>
									<Icon data-icon>
										{icon}
									</Icon>
									<span>
										{value}
									</span>
								</div>
							</Tooltip>
						</li>
					))}
				</ul>
			)
		}

		return (
			<ul className={classes.rootList}>
				<li data-li="item">
					<label>
						Name:
					</label>
					<span>
						{data.label}
					</span>
				</li>
				<li data-li="item">
					<label>
						Price:
					</label>
					<span>
						<strong>
							{helpers.custom.toUsd(data.price)}
						</strong>
					</span>
				</li>
				<li>
					{renderInfo()}
				</li>
				<li data-li="drawer">
					<Button
						fullWidth
						variant="outlined"
						onClick={async () => {
							await units.cls.loadUnitsOverview(data.unit_key)
							refDrawerContent.current.open()
						}} >
						Quick view
					</Button>
				</li>

			</ul>
		)
	}

	return (
		<div>

			<DrawerContent ref={refDrawerContent} />

			<Block
				backgroundSize="contain"
				data={data}
				show={data ? true : false}
				title="Unit"
				image={data?.image_plan}
				button={true}
				onClick={async () => {
					await logic.config.PS.enter_apartment(data.unit_key)
					logic.config.actions.changeMenu('units_overview')
					units.cls.loadUnitsOverview(data.unit_key)
				}}
				onClose={async () => {
					setData(false)
					await logic.config.PS.deselect_apartment()
					// await logic.config.PS.filtered_units([])
				}}
			>
				{renderContent()}
				{/* JSON.stringify(data) */}
			</Block>
		</div>
	)
}


Popup.propTypes = {
	// onExit: PropTypes.func.isRequired,
};

export default Popup
