import * as React from 'react';

// context
import { useCommands, useUnits } from '../../../../context/';

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
	const commands = useCommands();

	const cmd_data = false //commands.config.PS.cmd.select_apartment?.data
	const cmd_slug = units.menu.current

	const data = units.state.data_commercial

	if (!data) {
		return <div />;
	}

	// debug.add('data-commercial').json(data)

	return (
		<div>

			<CarouselItems
				image={item => item.image_plan}
				selected={item => item.unit_key == cmd_slug}
				onClickItem={item => {
					units.menu.changeMenu(item.unit_key)
				}}
				items={data.results}>
				{(item, index) => (
					<ul className={classes.cardList}>
						<li data-li="title">
							{item.label}
						</li>
						<li data-li="item">
							<label>
								Price:
							</label>
							<span>
								{format.money(item.price, '$')}
							</span>
						</li>
						<li>
							<ul>
								<li data-li="item">
									<label>
										Area:
									</label>
									<span>
										{item.square}
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
					</ul>
				)}
			</CarouselItems>

		</div>
	);
}

export default ListComponent
