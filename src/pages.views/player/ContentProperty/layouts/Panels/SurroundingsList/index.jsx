import * as React from 'react';

// context
import { useData, useCommands } from '../../../context/';

// material
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon';

// components
import CarouselItems from 'src/components/CarouselItems'
import ContentSlider from 'src/components/ContentSlider'
import CarouselHeader, { ChipsMenu } from '../../../components/CarouselHeader'

// blocks
import { PopupSurrounding } from '../../../popups/'


const useStyles = makeStyles((theme) => ({

	groupList: {
		// backgroundColor: 'blue',
		'& > [data-li="label"]': {
			// display: 'inline',
			// backgroundColor: theme.palette.primary.main,
			// boxShadow: `5px 0 0 ${theme.palette.primary.main}, -5px 0 0 ${theme.palette.primary.main}`,
		},
	},

	cardList: {
		'& > [data-li="label"]': {
			fontSize: theme.typography.body2.fontSize,
			fontWeight: theme.typography.fontWeightBold,
			marginBottom: theme.spacing(1),
			maxHeight: 40,
			overflow: 'hidden',
		},
		'& > [data-li="item"]': {
			display: 'flex',
			alignItems: 'center',
			marginTop: theme.spacing(.5),
			fontSize: theme.typography.caption.fontSize,
			'& [data-icon]': {
				marginLeft: theme.spacing(1),
				fontSize: theme.typography.fontSize,
			},
			'& > label': {
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1),
			},
			'& > span': {
				display: 'flex',
				alignItems: 'center',
			}
		},
	},

}));


function SurroundingsList(props) {
	const classes = useStyles();
	const dataBuilding = useData();
	const commands = useCommands();

	const [activeGroup, setActiveGroup] = React.useState(false)
	const [currentSlug, setCurrentSlug] = React.useState('groups')

	const cmd_data = '' //commands.config.PS.cmd.select_surrounding?.data
	const cmd_slug = '' //cmd_data?.value.slug

	const data = dataBuilding.state.building.surroundings


	const setGroupItem = item => {
		setActiveGroup(item)
		setCurrentSlug('items')

		const slugs = item.items.map(i => i.slug)
		// commands.config.PS.filtered_surroundings(slugs)
	}

	const renderItems = () => {

		if (!activeGroup) return <div />;

		const chips_list = data.map((item) => {
			return {
				label: item.name,
				onClick: () => setGroupItem(item),
				selected: activeGroup.id === item.id,
			}
		})

		return (
			<div>

				<CarouselHeader
					title={activeGroup.name}
					onBack={() => {
						setCurrentSlug('groups')
						// commands.config.PS.filtered_surroundings([])
					}}
				>
					<ChipsMenu list={chips_list} />
				</CarouselHeader>

				<CarouselItems
					image={item => item.image}
					selected={item => item.slug === cmd_slug}
					onClickItem={(item, index) => {
						// commands.config.PS.select_surrounding(item.slug)
					}}
					items={activeGroup.items}>
					{(item, index) => (
						<ul className={classes.cardList}>
							<li data-li="label">
								{item.name}
							</li>
							<li data-li="item">
								<label>Rating:</label>
								<span>
									{item.rating} <Icon data-icon>star</Icon>
								</span>
							</li>
							<li data-li="item">
								<label>Distance:</label> {item.distance} km.
							</li>
						</ul>
					)}
				</CarouselItems>
			</div>
		)
	}

	const renderGroups = () => {
		return (
			<div>
				<CarouselItems
					image={item => item.image}
					onClickItem={(item, index) => {
						setGroupItem(item)
					}}
					items={data}>
					{(item, index) => (
						<ul className={classes.groupList}>
							<li data-li="label">
								{item.name}
							</li>
						</ul>
					)}
				</CarouselItems>
			</div>
		);
	}


	const list = [
		{
			slug: 'groups',
			children: renderGroups,
			container: false,
		},
		{
			slug: 'items',
			children: renderItems,
			container: false,
		},
	]

	return (
		<div>

			{/* commands.menu.current_menu === 'surroundings' && (
				<PopupSurrounding onExit={async () => {
					if(activeGroup) {
						setGroupItem(activeGroup)
					} else {
						await commands.config.PS.deselect_surrounding()
					}
				}} />
			) */}

			<ContentSlider
				list={list}
				slug={currentSlug}
			/>
		</div>
	);
}

export default SurroundingsList
