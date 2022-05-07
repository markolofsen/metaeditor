import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { useApi } from '../hooks/'

// context
import { useCommands, useUnits } from '../context/';

// hooks
import { format } from 'metalib/common/helpers/'

// material
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';

// components
import Tooltip from '../components/Tooltip/'

// blocks
import Block from './Block/'
import DrawerContent from '../layouts/Panels/UnitsOverview/UnitToolbar/DrawerContent/'



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
			'& [data-row]': {
				display: 'flex',
				alignItems: 'center',
				whiteSpace: 'nowrap',
				'& > [data-icon]': {
					marginRight: theme.spacing(.5),
					color: theme.palette.text.secondary,
				}
			}
		}
	},

}));


function Popup(props) {
	const api = useApi()
	const classes = useStyles();
	const commands = useCommands();
	const units = useUnits();

	const refDrawerContent = React.useRef(null)

	const [data, setData] = React.useState(false)

	/* OPEN-CLOSE popup */

	// const cmd_caller = logic.config.PS.callback_caller
	// const cmd_loading = logic.config.PS.callback_loading
	// const cmd_data = logic.config.PS.cmd.select_apartment?.data
	const cmd_slug = units.menu.current

	React.useEffect(() => {

		return () => {
			setData(false)
			// logic.config.PS.cmd.select_apartment.reset()
		}
	}, [])

	React.useEffect(() => {

		if (!cmd_slug) {
			setData(false)
			return;
		}

		api.vec_overlay.units_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})

	}, [cmd_slug])


	const renderContent = () => {
		if (!data) return;

		const renderInfo = () => {

			const list = [
				['Bedrooms', 'bed', data.bedrooms],
				['Bathrooms', 'shower', data.bathrooms],
				['Floor', 'height', data.floor],
				['Area', 'photo_size_select_small', format.number(data.square, {
					decimal: 0,
					addon: 'sq.ft.',
					separator: ','
				})],
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
							{format.money(data.price, '$')}
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
					units.menu.changeMenu(false)
					commands.cmd.method.enter_apartment.emit({ slug: data.unit_key })
					commands.menu.changeMenu('units_overview')

					// units.cls.loadUnitsOverview(data.unit_key)
				}}
				onClose={async () => {
					setData(false)
					units.menu.changeMenu(false)
					// commands.cmd.method.deselect_unit.emit()
					// commands.cmd.method.amenities_overview.emit({slug: overview.slug})
					// await logic.config.PS.deselect_apartment()
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
