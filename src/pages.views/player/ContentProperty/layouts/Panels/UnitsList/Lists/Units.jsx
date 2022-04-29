import React from 'react';


// context
import { useLogic, useUnits } from '../../../context/';

// hooks
import { useHelpers } from 'hooks/'

// material
import {
	makeStyles,
} from '@mui/material/styles';
import Icon from '@mui/material/Icon';

// components
import JsonDialog from 'components/JsonDialog/'

// components
import CarouselItems from '../../../components/CarouselItems/'


const useStyles = makeStyles((theme) => ({

	cardList: {
		'& > li': {
			marginTop: theme.spacing(.1),
			...theme.typography.caption,
			'&:first-child': {
				marginTop: 0,
			}
		},
		'& > [data-li="title"]': {
			fontSize: theme.typography.body2.fontSize,
			fontWeight: theme.props.fontWeight.semiBold,
			overflow: 'hidden',
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


function ListComponent(props) {
	const classes = useStyles();
	const units = useUnits()
	const logic = useLogic();
	const helpers = useHelpers();

	const cmd_data = logic.config.PS.cmd.select_apartment?.data
	const cmd_slug = cmd_data?.value.slug
	const data = units.state.data_units


	React.useEffect(() => {
		return () => {
			logic.config.PS.cmd.select_apartment.reset()
		}
	}, [])


	if (!data) {
		return <div />;
	}

	return (
		<div>

			<JsonDialog id="data-units" data={data} />

			<CarouselItems
				variant="twin"
				image={item => item.image_plan}
				backgroundSize="contain"
				selected={item => item.unit_key == cmd_slug}
				onClickItem={item => {
					logic.config.PS.select_apartment(item.unit_key)
				}}
				items={data.results}>
				{({ item, active }) => (
					<ul className={classes.cardList}>
						<li data-li="title">
							{item.label}
						</li>
						<li data-li="item">
							<label>
								Price:
							</label>
							<span>
								{helpers.custom.toUsd(item.price)}
							</span>
						</li>
						<li>
							<ul>
								<li data-li="item">
									<label>
										Area:
									</label>
									<span>
										{helpers.custom.toSqFt(item.square)}
									</span>
								</li>
								<li data-li="item">
									<label>
										Floor:
									</label>
									<span>
										{item.floor}
									</span>
								</li>
							</ul>
						</li>
						<li>
							<ul data-list="icons">
								<li data-li="item">
									<Icon data-icon>bed</Icon>
									<span>
										{item.bedrooms}
									</span>
								</li>
								<li data-li="item">
									<Icon data-icon>shower</Icon>
									<span>
										{item.bathrooms}
									</span>
								</li>
							</ul>
						</li>
					</ul>
				)}
			</CarouselItems>

		</div>
	);
}

export default ListComponent
