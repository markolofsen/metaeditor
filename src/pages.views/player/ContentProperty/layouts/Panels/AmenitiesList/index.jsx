import React from 'react';

// context
import { useBuilding, useLogic, useLayout } from '../../../context/';

// styles
import { styled } from 'metalib/styles/'

// player components
import CarouselItems from 'src/components/CarouselItems'

// hooks
import useBridge from '../../../useBridge';

// blocks
// import { PopupAmenity } from '../../popups/'




const ContentDiv = styled.div(theme => ({
	flex: 1,
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	...theme.typography.h6,
	borderLeft: `solid 1px ${theme.palette.divider}`,
	paddingLeft: theme.spacing(2),
}))


function AmenitiesList(props) {
	const layout = useLayout()
	const building = useBuilding();
	// const logic = useLogic();
	const bridge = useBridge()

	const current = layout.state.current_event
	const currentSlug = current.value.slug

	// const cmd_data = logic.config.PS.cmd.select_amenity?.data
	// const cmd_slug = cmd_data?.value.slug

	const items = building.state.building_data.amenities

	return (
		<div>

			{/* {logic.config.state.current_menu === 'amenities' && (
				<PopupAmenity />
			)} */}

			<CarouselItems
				image={item => item.image}
				onClickItem={(item, index) => {
					bridge.amenities.enter(item.slug)
				}}
				onSelected={(item, index) => currentSlug === item.slug}
				numberOfCards={{ xs: 1, md: 2, default: 4 }}
				infiniteLoop={false}
				gutter={10}
				items={items}>
				{(item, index) => {
					return (
						<ContentDiv key={index}>
							{item.name}
							{/* {JSON.stringify(item)} */}
						</ContentDiv>
					)
				}}
			</CarouselItems>

		</div>
	);
}

export default AmenitiesList
