import * as React from 'react';

// context
import { useUnits, useCommands } from '../../../context/';

// hooks
import { format } from 'metalib/common/helpers'


// material
import { makeStyles } from '@mui/styles'
// import Typography from '@mui/material/Typography';

// components
import CarouselItems from 'src/components/CarouselItems'
import CarouselHeader, { ChipsMenu } from '../../../components/CarouselHeader'

// blocks
import UnitToolbar from './UnitToolbar/'


const useStyles = makeStyles((theme) => ({

	cardList: {
		'& > [data-li="label"]': {
			...theme.typography.caption,
			marginBottom: theme.spacing(1),
		},
		'& > [data-li="price"]': {
			display: 'inline',
			backgroundColor: theme.palette.primary.main,
			boxShadow: `5px 0 0 ${theme.palette.primary.main}, -5px 0 0 ${theme.palette.primary.main}`,
		},
	},

}));


function UnitsOverview(props) {
	const classes = useStyles();
	const units = useUnits();
	const commands = useCommands();

	const [mounted, setMounted] = React.useState(false)

	// Quick links
	const cmd_slug = commands.menu.current
	const unit_slug = units.menu.current

	const data = units.state.data_units_overview
	const items = data.plan?.interiors || []


	React.useEffect(() => {

		// Reboot ui for Portal in UnitToolbar
		if (cmd_slug === 'units_overview') {
			setMounted(true)
		} else {
			// commands.config.PS.cmd.apartment_interior.reset()
			setMounted(false)
		}

	}, [cmd_slug])


	const renderHeader = () => {

		const hotspots = data.hotspots || []
		// const hotspots_data = commands.config.PS.cmd.apartment_interior.data
		// const hotspots_slug = hotspots_data?.value.slug

		const chips_list = hotspots.map((item) => {
			return {
				label: item.name,
				onClick: () => {
					// commands.config.PS.teleport_to_point(item.slug)
				},
				selected: false,
			}
		})

		return (
			<CarouselHeader
				title="Interiors"
				onBack={undefined}
				extra={(
					<ChipsMenu list={chips_list} />
				)}
			/>
		);

	}

	return (
		<div>

			<UnitToolbar show={mounted} />

			{renderHeader()}

			<CarouselItems
				image={item => item.image}
				selected={item => item.slug === unit_slug}
				onClickItem={item => {
					commands.cmd.method.apartment_interior({ slug: item.slug })
				}}
				items={items}>
				{({ item, active }) => (
					<ul className={classes.cardList}>
						<li data-li="label">
							{item.name}
						</li>
						<li data-li="price">
							{format.money(item.price)}
						</li>
					</ul>
				)}
			</CarouselItems>
		</div>
	);
}

export default UnitsOverview
