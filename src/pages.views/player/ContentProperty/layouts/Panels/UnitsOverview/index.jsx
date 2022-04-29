import React from 'react';

// context
import { useUnits, useLogic } from '../../context/';

// hooks
import { useHelpers } from 'hooks/'


// material
import {
	makeStyles,
} from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

// components
import CarouselItems from '../../components/CarouselItems/'
import CarouselHeader, { ChipsMenu } from '../../components/CarouselHeader/'

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
	const helpers = useHelpers();
	const units = useUnits();
	const logic = useLogic();

	const [mounted, setMounted] = React.useState(false)

	React.useEffect(() => {

		// Reboot ui for Portal in UnitToolbar
		if (logic.config.state.current_menu === 'units_overview') {
			setMounted(true)
		} else {
			logic.config.PS.cmd.apartment_interior.reset()
			setMounted(false)
		}

	}, [logic.config.state.current_menu])

	// Quick links
	const cmd_data = logic.config.PS.cmd.apartment_interior?.data
	const cmd_slug = cmd_data?.value.slug
	const data = units.state.data_units_overview
	const items = data.plan?.interiors || []

	const renderHeader = () => {

		const hotspots = data.hotspots || []
		// const hotspots_data = logic.config.PS.cmd.apartment_interior.data
		// const hotspots_slug = hotspots_data?.value.slug

		const chips_list = hotspots.map((item) => {
			return {
				label: item.name,
				onClick: () => {
					logic.config.PS.teleport_to_point(item.slug)
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
				variant="simple"
				backgroundImage={item => item.image}
				selected={item => item.slug === cmd_slug}
				onClickItem={item => {
					logic.config.PS.apartment_interior(item.slug)
				}}
				items={items}>
				{({ item, active }) => (
					<ul className={classes.cardList}>
						<li data-li="label">
							{item.name}
						</li>
						<li data-li="price">
							{helpers.custom.toUsd(item.price)}
						</li>
					</ul>
				)}
			</CarouselItems>
		</div>
	);
}

export default UnitsOverview
