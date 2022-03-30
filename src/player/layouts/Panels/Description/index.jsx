import * as React from 'react';

// api
import { env } from 'api/'

// hooks
import { useMedia } from 'metaeditor/common/hooks/'

// material
import { styled } from 'metaeditor/common/styles/'
import Button from '@mui/material/Button';


const TITLE_HEIGHT = 40
const CONTENT_HEIGHT = 80


const RootList = styled.ul(theme => ({

	paddingBottom: theme.spacing(2),

	[theme.breakpoints.down('sm')]: {
		'& > [data-li="info"]': {
			// padding: theme.spacing(2, 0),
			display: 'none',
		},
	},
	[theme.breakpoints.up('sm')]: {
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

}))

const ContentList = styled.ul(theme => ({

	[theme.breakpoints.down('sm')]: {
		'& > [data-li="image"]': {
			display: 'none',
		},
	},

	[theme.breakpoints.up('sm')]: {
		display: 'flex',

		'& > [data-li="image"]': {
			maxWidth: 200,
			margin: theme.spacing(0, 8, 0, 0),
			'& > img': {
				width: '100%',
				borderRadius: theme.shape.borderRadius,
			}
		},
	},

	'& > [data-li="content"]': {
		'& > ul': {
			'& > [data-li="title"]': {
				...theme.typography.h4,
				minHeight: TITLE_HEIGHT,
			},
			'& > [data-li="description"]': {
				...theme.typography.body1,
				paddingBottom: theme.spacing(2),
				[theme.breakpoints.up('sm')]: {
					minHeight: CONTENT_HEIGHT,
				},
			},
			'& > [data-li="buttons"]': {
				display: 'flex',
				flexWrap: 'wrap',
				margin: theme.spacing(0, -.5),
				'& > *': {
					margin: theme.spacing(.5),
				},
			},
		}
	},
}))

const InfoList = styled.ul(theme => ({
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
				fontSize: theme.typography.caption.fontSize,
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
	'& > [data-li="button"]': {
		marginTop: theme.spacing(2),
	},
}))


function OverviewCard(props) {
	const media = useMedia();

	const renderContent = () => {
		const description = `The Audi A4 is a line of compact executive cars produced since 1994 by the German car manufacturer Audi, a subsidiary of the Volkswagen Group.`
			?.replace(/^(.{160}[^\s]*).*/, "$1")

		return (
			<ContentList>

				<li data-li="image">
					<img src={env.staticPath('tmp', 'about_preview.jpg')} />
				</li>

				<li data-li="content">
					<ul>
						<li data-li="title">
							Audi A4
						</li>
						<li data-li="description">
							{description}
						</li>
						<li data-li="buttons">
							<Button variant="contained" color="secondary" disabled>
								Read more
							</Button>
						</li>
					</ul>
				</li>
			</ContentList>
		)
	}

	const renderInfo = () => {

		const list = [
			['Top Speed', '250 km/h or 155 Mph'],
			['Horsepower', '265 hp / 195 kW'],
			['Engine size', '1984 cm3 (121.1 cu-in)'],
		].map(([label, value]) => ({ label, value }))

		return (
			<InfoList>
				<li data-li="title">
					Info
				</li>
				<li data-li="content">
					<ul>
						{list.map((item, index) => (
							<li key={index}>
								<label>{item.label}:</label>
								<span>{item.value}</span>
							</li>
						))}
					</ul>
				</li>
				<li data-li="button">
					<Button variant="contained" color="secondary" disabled>
						Ride now!
					</Button>
				</li>
			</InfoList>
		)
	}

	return (
		<div>

			<RootList>
				<li data-li="content">
					{renderContent()}
				</li>
				<li data-li="info">
					{renderInfo()}
				</li>
			</RootList>

		</div>
	);
}


export default OverviewCard
