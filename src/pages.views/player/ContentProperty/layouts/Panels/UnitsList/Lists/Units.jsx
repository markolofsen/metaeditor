import * as React from 'react';

import { useRouter } from 'next/router';

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
	// const debug = useDebug()
	const router = useRouter()
	const classes = useStyles();
	const units = useUnits()
	const commands = useCommands();

	const cmd_slug = units.menu.current
	const data = units.state.data_units


	React.useEffect(() => {
		return () => {
			// commands.config.PS.cmd.select_apartment.reset()
		}
	}, [])


	if (!data) {
		return <div />;
	}

	// debug.add('data-units').json(data)

	return (
		<div>

			<CarouselItems
				image={item => item.image_plan}
				selected={item => item.unit_key == cmd_slug}
				onClickItem={item => {
					const slug = item.unit_key.replace(router.query.slug, 'ty1')
					units.menu.changeMenu(slug)
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
