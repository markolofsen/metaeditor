import React from 'react';

// context
import { useLogic } from '../../context/';


// material
import {
	makeStyles,
} from '@mui/material/styles';
// import Typography from '@mui/material/Typography';

// components
import ContentSlider from '../../components/ContentSlider/'

// blocks
import ToolbarUnits from './Toolbar/'
import Filter from './Filter/'
import ListComponent from './Lists/'
import UnitsTable from './UnitsTable/'

import { PopupUnit } from '../../popups/'

const useStyles = makeStyles((theme) => ({


}));


function UnitsList(props) {
	const classes = useStyles();
	const logic = useLogic();

	const { loaded } = logic.config.PS.state.player
	const { current_menu, slider_expanded } = logic.config.state

	const renderList = () => {

		const list = [
			{
				slug: 'list',
				children: ListComponent,
				container: false,
			},
			{
				slug: 'units_table',
				children: UnitsTable,
				container: false,
			},
		]

		const slug = logic.config.state.slider_expanded ? 'units_table' : 'list'

		return (
			<div>

				<ContentSlider
					list={list}
					slug={slug}
				/>

			</div>
		);
	}

	return (
		<div>

			{!slider_expanded && current_menu === 'units' && (
				<>
					<PopupUnit />
					<ToolbarUnits />
				</>
			)}

			<Filter />
			{renderList()}

		</div>
	);
}

export default UnitsList
