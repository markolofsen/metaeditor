import React from 'react';

// context
import { useLogic, useUnits } from '../../../context/';

// hooks
import { useHelpers } from 'hooks/'

// material
import {
	makeStyles,
} from '@mui/material/styles';
// import Icon from '@mui/material/Icon';

// components
import DataGrid from 'components/DataGrid/'

// blocks
import DrawerContent from '../../UnitsOverview/UnitToolbar/DrawerContent/'


const useStyles = makeStyles((theme) => ({

	root: {
		padding: theme.spacing(2),
		// backgroundColor: theme.palette.background.default,
	}

}));


function UnitsTable(props) {
	const classes = useStyles();
	const logic = useLogic();
	const units = useUnits();
	const helpers = useHelpers();

	const refDrawerContent = React.useRef(null)
	const refUnitsTable = React.useRef(null);

	const { appbar_size } = logic.config.state
	const { current_panel } = units.state

	const offset = (appbar_size?.height || 0) + (units.state.filters.filters_size?.height || 0)

	const getData = () => {
		switch (current_panel) {
			case 'plans':
				return units.state.data_plans;
				break;
			case 'units':
				return units.state.data_units;
				break;
			case 'commercial':
				return units.state.data_commercial;
				break;
			default:
				return false;
		}
	}

	const getColumns = () => {

		const columnsPlans = [
			{
				field: 'id',
				headerName: 'ID',
				type: 'number',
				width: 100,
				// sortable: true,
				// resizable: true,
				// filterable: false,
				hide: true,
			},
			{
				field: 'label',
				headerName: 'Label',
				type: 'text',
				width: 200,
			},
			{
				field: 'image',
				headerName: 'Image',
				type: 'text',
				width: 150,
				renderCell: (params) => (
					<div>
						{params.value ? (
							<div className={classes.imageBox}>
								<img src={params.value} />
							</div>
						) : ''}
					</div>
				),
			},
			{
				field: 'price_from',
				headerName: 'Price from',
				type: 'number',
				width: 150,
				renderCell: (params) => helpers.custom.toUsd(params.value || 0)
			},
			{
				field: 'bedrooms',
				headerName: 'Bedrooms',
				type: 'number',
				width: 140,
				sortable: true,
				renderCell: (params) => `${params.value} Beds`
			},
			{
				field: 'bathrooms',
				headerName: 'Bathrooms',
				type: 'number',
				width: 140,
				sortable: true,
				renderCell: (params) => `${params.value} Baths`
			},
			{
				field: 'square',
				headerName: 'Square',
				type: 'text',
				width: 140,
				sortable: false,
				valueGetter: (params) => params.row?.total?.square || [0, 0],
				renderCell: (params) => helpers.custom.toSqFt(params.value)
			},
			{
				field: 'floor',
				headerName: 'Floor',
				type: 'text',
				width: 140,
				sortable: false,
				valueGetter: (params) => params.row?.total?.floor || [0, 0],
				renderCell: (params) => params.value.join('—'),
			},
			{
				field: 'units_list',
				headerName: 'Units',
				type: 'number',
				width: 140,
				sortable: false,
				valueGetter: (params) => params.row?.units_list?.length,
				// renderCell: (params) => params.value.join('—'),
			},


		];

		const columnsUnits = [
			{
				field: 'id',
				headerName: 'ID',
				type: 'number',
				width: 100,
				// sortable: true,
				// resizable: true,
				// filterable: false,
				hide: true,
			},
			{
				field: 'label',
				headerName: 'ID',
				headerName: 'ID',
				type: 'text',
				width: 200,
			},
			{
				field: 'image_plan',
				headerName: 'Image',
				type: 'text',
				width: 150,
				renderCell: (params) => (
					<div>
						{params.value ? (
							<div className={classes.imageBox}>
								<img src={params.value} />
							</div>
						) : ''}
					</div>
				),
			},
			{
				field: 'price',
				headerName: 'Price',
				type: 'number',
				width: 150,
				renderCell: (params) => helpers.custom.toUsd(params.value || 0)
			},
			{
				field: 'bedrooms',
				headerName: 'Bedrooms',
				type: 'number',
				width: 140,
				sortable: true,
				renderCell: (params) => `${params.value} Beds`
			},
			{
				field: 'bathrooms',
				headerName: 'Bathrooms',
				type: 'number',
				width: 140,
				sortable: true,
				renderCell: (params) => `${params.value} Baths`
			},
			{
				field: 'square',
				headerName: 'Square',
				type: 'text',
				width: 140,
				sortable: false,
				// valueGetter: (params) => params.row.total.square,
				// renderCell: (params) => helpers.custom.toSqFt(params.value),
			},
			{
				field: 'floor',
				headerName: 'Floor',
				type: 'text',
				width: 140,
				sortable: false,
				// valueGetter: (params) => params.row.total.floor,
				// renderCell: (params) => params.value.join('—'),
			},

		];

		if (current_panel === 'plans') {
			return columnsPlans || [];
		}

		return columnsUnits || [];
	}


	return (
		<div className={classes.root} style={{
			height: `calc(100vh - ${offset}px)`,
		}}>
			<DrawerContent ref={refDrawerContent} />

			<DataGrid
				ref={refUnitsTable}
				loading={false}
				data={getData()}
				columns={getColumns()}
				rowHeight={70}
				pageSize={5}
				onRowClick={async (item) => {

					if (current_panel !== 'plans') {
						await units.cls.loadUnitsOverview(item.unit_key)
						refDrawerContent.current.open()
					}

				}}
				renderMode="client"
				mobileView={() => <div />}
			/>

		</div>
	);
}

export default UnitsTable
