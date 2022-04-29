import React from 'react';

// context
import { useBuilding, useLogic } from '../../../context/';

// material
import { makeStyles, } from '@mui/styles';

// components
import CarouselItems from 'metaeditor/components/CarouselItems/'

// blocks
// import { PopupAmenity } from '../../popups/'


const useStyles = makeStyles((theme) => ({

	cardList: {
		'& > [data-li="label"]': {
			display: 'inline',
			backgroundColor: theme.palette.primary.main,
			boxShadow: `5px 0 0 ${theme.palette.primary.main}, -5px 0 0 ${theme.palette.primary.main}`,
		},
	}

}));


function AmenitiesList(props) {
	const classes = useStyles();
	const building = useBuilding();
	const logic = useLogic();


	const cmd_data = logic.config.PS.cmd.select_amenity?.data
	const cmd_slug = cmd_data?.value.slug

	const items = building.state.building_data.amenities

	return (
		<div>

			{/* {logic.config.state.current_menu === 'amenities' && (
				<PopupAmenity />
			)} */}

			<CarouselItems
				numberOfCards={{ xs: 1, md: 2, default: 4 }}
				infiniteLoop
				gutter={10}
				items={items}>
				{(item, index) => {
					return (
						<ul className={classes.cardList}>
							<li data-li="label">
								{item.name}
							</li>
						</ul>
					)
				}}
			</CarouselItems>


			{/* <CarouselItems
				variant="simple"
				backgroundImage={item => item.image}
				selected={item => item.slug === cmd_slug}
				onClickItem={item => {
					logic.config.PS.select_amenity(item.slug)
				}}
				items={items}>
				{({ item, active }) => (
					
				)}
			</CarouselItems>
			 */}
		</div>
	);
}

export default AmenitiesList
