import * as React from 'react';

// context
import { useCommands } from '../../../context/';


// material
import { makeStyles } from '@mui/styles'
// import Typography from '@mui/material/Typography';

// components
import ContentSlider from 'src/components/ContentSlider'

// blocks
import ToolbarUnits from './Toolbar/'
import Filter from './Filter/'
import ListComponent from './Lists/'
import UnitsTable from './UnitsTable/'

import { PopupUnit } from '../../../popups/'

const useStyles = makeStyles((theme) => ({


}));


function UnitsList(props) {
	const classes = useStyles();
	const commands = useCommands();

	const slider_expanded = false
	const current_menu = commands.menu.current

	const renderList = () => {

		const list = [
			{
				slug: 'list',
				children: ListComponent,
				container: false,
			},
			// {
			//   slug: 'units_table',
			//   children: UnitsTable,
			//   container: false,
			// },
		]

		const slug = slider_expanded ? 'units_table' : 'list'

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

			{current_menu === 'units' && (
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
