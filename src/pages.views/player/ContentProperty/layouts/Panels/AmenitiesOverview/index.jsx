import React from 'react';

// context
import { useBuilding, useLogic } from '../../../context/';

// hooks
import { useApi } from '../../../hooks/'

// material
import { makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';

// blocks
// import Dialog from 'metaeditor/components/Dialog/'

// // components
// import JsonDialog from 'components/JsonDialog/'


const TITLE_HEIGHT = 40
const CONTENT_HEIGHT = 80

const useStyles = makeStyles((theme) => ({

	rootList: {
		display: 'flex',
		'& > li': {
			flex: 1,
		},
		'& > [data-li="content"]': {
			paddingRight: theme.spacing(6),
		},
		'& > [data-li="info"]': {
			maxWidth: '30%',
			minWidth: 300,
		},
	},
	contentList: {
		display: 'flex',
		'& > [data-li="back"]': {
			flex: 1,
			minWidth: 60,
		},
		'& > [data-li="image"]': {
			flex: 1,
			minWidth: 200,
			height: 150,

			marginRight: theme.spacing(4),
			backgroundColor: theme.palette.background.paper,
			borderRadius: theme.shape.borderRadius,

			backgroundSize: 'cover',
			backgroundPosition: 'center center',

		},
		'& > [data-li="content"]': {
			'& > ul': {
				'& > [data-li="title"]': {
					...theme.typography.h4,
					minHeight: TITLE_HEIGHT,
				},
				'& > [data-li="description"]': {
					...theme.typography.body1,
					minHeight: CONTENT_HEIGHT,
				},
			}
		},
	},
	infoList: {
		'& > [data-li="title"]': {
			...theme.typography.h6,
			minHeight: TITLE_HEIGHT,
		},
		'& > [data-li="content"]': {
			minHeight: CONTENT_HEIGHT,

			'& > ul': {
				'& > li': {
					display: 'flex',
					marginBottom: theme.spacing(1),
					'&:last-child': {
						marginBottom: 0,
					},
					'& > label': {
						width: 140,
						fontWeight: theme.typography.fontWeightBold,
					}
				}
			}
		},
	},

}));


function AmenitiesOverview(props) {
	const api = useApi()
	const classes = useStyles();
	const logic = useLogic();
	const building = useBuilding()

	const [slug, setSlug] = React.useState(false)
	const [data, setData] = React.useState(false)

	const data_building = building.state.building_data.overview
	const cmd_slug = logic.config.PS.cmd.enter_amenity?.data?.value.slug

	React.useEffect(() => {
		if (cmd_slug && cmd_slug !== slug) {
			setSlug(cmd_slug)
			loadData()
		}
	}, [cmd_slug])

	const loadData = async () => {
		await api.vec_overlay.amenities_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})
	}

	const renderContent = () => {

		if (!data) {
			return (<div />);
		}

		return (
			<ul className={classes.contentList}>
				<li data-li="back">
					<IconButton data-icon onClick={async () => {
						await logic.config.PS.leave_amenity()
						setData(false)
					}}>
						<Icon>arrow_back</Icon>
					</IconButton>
				</li>
				{data.image ? (
					<li data-li="image" style={{
						backgroundImage: `url(${data.image})`,
					}} />
				) : ''}
				<li data-li="content">
					<ul>
						<li data-li="title">
							{data.name}
						</li>
						<li data-li="description">
							{data.description}
						</li>
					</ul>
				</li>
			</ul>
		)
	}

	const renderInfo = () => {

		const list = [
			['Completion', data_building.build_date],
			['Starting At', data_building.start_price],
			['Location', data_building.location],
		]

		return (
			<ul className={classes.infoList}>
				<li data-li="title">
					Info
				</li>
				<li data-li="content">
					<ul>
						{list.map(([label, value], index) => (
							<li key={index}>
								<label>{label}:</label>
								<span>{value}</span>
							</li>
						))}
					</ul>
				</li>
			</ul>
		)
	}

	return (
		<div>

			{/* <JsonDialog id="amenity-data" data={data} /> */}

			<ul className={classes.rootList}>
				<li data-li="content">
					{renderContent()}
				</li>
				<li data-li="info">
					{renderInfo()}
				</li>
			</ul>
		</div>
	);
}


export default AmenitiesOverview
