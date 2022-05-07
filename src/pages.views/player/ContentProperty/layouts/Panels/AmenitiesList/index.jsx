import * as React from 'react';

// context
import { useData, useCommands } from '../../../context/';

// material
import { makeStyles } from '@mui/styles'
// import Typography from '@mui/material/Typography';

// components
import CarouselItems from 'src/components/CarouselItems'

// blocks
import { PopupAmenity } from '../../../popups/'


const useStyles = makeStyles((theme) => ({

	cardList: {
		// height: '100%',
		// display: 'flex',
		// flexDirection: 'column',
		// justifyContent: 'center',
		'& > [data-li="label"]': {
			// display: 'inline',
			// backgroundColor: theme.palette.primary.main,
			// boxShadow: `5px 0 0 ${theme.palette.primary.main}, -5px 0 0 ${theme.palette.primary.main}`,
		},
	}

}));


function AmenitiesList(props) {
	const classes = useStyles();
	const data = useData();
	const commands = useCommands();


	const cmd_slug = commands.menu.current
	const items = data.state.building.amenities

	React.useEffect(() => {
		if (cmd_slug === 'amenities') {
			const slugs = items.map((item) => item.slug)
			commands.cmd.method.filtered_amenities.emit({ slugs })
		}
	}, [cmd_slug])

	return (
		<div>

			{cmd_slug === 'amenities' && (
				<PopupAmenity />
			)}

			<CarouselItems
				image={item => item.image}
				selected={item => item.slug === commands.amenities.current}
				onClickItem={item => {
					commands.amenities.changeMenu(item.slug)
					commands.cmd.method.select_amenity.emit({ slug: item.slug })
					commands.cmd.method.move_camera_to_amenity.emit({ slug: item.slug })
				}}
				items={items}>
				{(item, index) => (
					<ul className={classes.cardList}>
						<li data-li="label">
							{item.name}
						</li>
					</ul>
				)}
			</CarouselItems>
		</div>
	);
}

export default AmenitiesList
