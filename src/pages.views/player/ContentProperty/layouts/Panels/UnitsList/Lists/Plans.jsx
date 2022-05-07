import * as React from 'react';


// context
import {
	useUnits,
} from '../../../../context/';

// hooks
import { format } from 'metalib/common/helpers/'

// material
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon';

// components
import CarouselItems from 'src/components/CarouselItems'


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

	const data = units.state.data_plans

	if (!data) {
		return <div />;
	}

	// debug.add('data-plans').json(data)

	return (
		<div>
			<CarouselItems
				image={item => item.image}
				selected={item => false}
				onClickItem={item => {
					units.filters.setPlanId(item.id)
					units.menu.changeMenu(false)
				}}
				items={data.results}>
				{(item, index) => (
					<ul className={classes.cardList}>
						<li data-li="title">
							{item.label}
						</li>
						<li data-li="item">
							<label>
								Price from:
							</label>
							<span>
								{format.money(item.price_from, '$')}
							</span>
						</li>
						<li>
							<ul>
								<li data-li="item">
									<label>
										Area:
									</label>
									<span>
										{item.total.square}
									</span>
								</li>
								<li data-li="item">
									<label>
										Floor:
									</label>
									<span>
										{item.total.floor ? item.total.floor.join('-') : ''}
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
