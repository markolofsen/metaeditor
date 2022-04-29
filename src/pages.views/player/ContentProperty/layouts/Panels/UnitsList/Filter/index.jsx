import React from 'react';

// context
import {
	useBuilding,
	useUnits,
} from '../../../context/';


// hooks
import { useHelpers, useContainerDimensions } from 'hooks/'

// material
import {
	makeStyles,
} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';


// components
import SliderInterval from '../../../components/Slider/Interval'
import Chip from '../../../components/Chip/'


const useStyles = makeStyles((theme) => ({

	rootList: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: theme.spacing(2),
		'& > [data-li="settings"]': {
			display: 'flex',
			alignItems: 'center',
			'& > *': {
				marginRight: theme.spacing(4),
			}
		}
	},

	typesList: {
		display: 'flex',
		'& > li': {
			marginRight: theme.spacing(1),
		}
	},

	selectedPlanHeader: {
		display: 'flex',
		alignItems: 'center',
		'& > [data-li="label"]': {
			...theme.typography.h6,
			paddingLeft: theme.spacing(1),
		}
	},

	priceRange: {
		width: 300,
	}

}));


function UnitsList(props) {
	const classes = useStyles();
	const helpers = useHelpers();
	const building = useBuilding();
	const units = useUnits();

	const refFilters = React.useRef(null);
	const filtersSize = useContainerDimensions(refFilters)

	React.useEffect(() => {
		units.filters.setFiltersSize(filtersSize)
	}, [filtersSize])

	const building_data = building.state.building_data.overview
	const { current_panel } = units.state


	const renderType = () => {

		if (units.state.filters.plan_id && current_panel === 'units') {
			return (
				<ul className={classes.selectedPlanHeader}>
					<li>
						<IconButton
							data-pointer
							onClick={() => {
								units.filters.unsetPlanId()
								units.cls.loadData('plans')
							}}>
							<Icon>arrow_back</Icon>
						</IconButton>
					</li>
					<li data-li="label">
						Floor plan: {units.filters.getSelectedPlanLabel}
					</li>
				</ul>
			);
		}

		const list = [
			['plans', 'Floor plans'],
			['units', 'All units'],
			['commercial', 'Commercial'],
		]

		return (
			<ul className={classes.typesList}>
				{list.map(([slug, label], index) => (
					<li key={index}>
						<Chip
							label={label.toUpperCase()}
							selected={current_panel === slug}
							onClick={() => {
								units.filters.unsetPlanId()
								units.cls.loadData(slug)
							}} />
					</li>
				))}
			</ul>
		);

	}

	const renderBedrooms = () => {

		if (current_panel !== 'units' || units.state.filters.plan_id) return;

		const list = [
			[0, 'all'],
			[1, '1 br'],
			[2, '2 br'],
			[3, '3 br'],
			[4, '4 br+'],
		]

		return (
			<ul className={classes.typesList}>
				{list.map(([slug, label], index) => (
					<li key={index}>
						<Chip
							label={label.toUpperCase()}
							selected={units.state.filters.bedrooms === slug}
							onClick={() => {
								units.filters.setBedrooms(slug)
							}} />
					</li>
				))}
			</ul>
		);

	}

	const renderPriceRange = () => {
		if (current_panel === 'plans') return;

		const start_price = building_data.start_price
		const end_price = building_data.end_price

		return (
			<div className={classes.priceRange}>
				<SliderInterval
					intervals={[start_price, end_price]}
					onChange={(v) => units.filters.setPriceInterval(v)}
					min={start_price}
					max={end_price}
					step={10000}
					format={c => '$ ' + helpers.format.formatNumberShortener(c)}
				/>
			</div>
		)
	}

	return (
		<div ref={refFilters}>

			<ul className={classes.rootList}>
				<li data-li="settings">
					{renderType()}
					{renderBedrooms()}
					{renderPriceRange()}
				</li>
				<li>
					<Chip label="EXPAND LIST" onClick={() => {
						units.filters.expandUnits()
					}} />
				</li>
			</ul>


		</div>
	);
}

export default UnitsList
