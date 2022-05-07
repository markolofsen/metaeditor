import * as React from 'react';

// context
import { useData, useCommands } from '../../../context/';

// hooks
import { format } from 'metalib/common/helpers/'

// material
import { makeStyles } from '@mui/styles'
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';

// blocks
import Dialog from 'metaeditor/components/Dialog/'


const TITLE_HEIGHT = 40
const CONTENT_HEIGHT = 80

const useStyles = makeStyles((theme) => ({

	rootList: {
		paddingBottom: theme.spacing(2),

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
	},
	contentList: {
		display: 'flex',
		'& > [data-li="image"]': {
			[theme.breakpoints.down('sm')]: {
				display: 'none',
			},

			maxWidth: 200,
			marginRight: theme.spacing(8),
			'& > img': {
				width: 'auto',
				maxHeight: 200,
			}
		},
		'& > [data-li="content"]': {
			'& > ul': {
				'& > [data-li="title"]': {
					...theme.typography.h4,
					minHeight: TITLE_HEIGHT,
				},
				'& > [data-li="description"]': {
					...theme.typography.body1,
					[theme.breakpoints.up('sm')]: {
						minHeight: CONTENT_HEIGHT,
					},
				},
				'& > [data-li="button"]': {
					marginTop: theme.spacing(2),
				},
			}
		},
	},
	infoList: {
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
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
					...theme.typography.body2,
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
	},

}));


function OverviewCard(props) {
	const classes = useStyles();
	const commands = useCommands();
	const buildingData = useData()

	const data = buildingData.state.building.overview

	const renderDialogContent = () => {
		return (
			<ul className={classes.contentList}>
				<li data-li="image">
					<img src={data.logotype_src} />
				</li>
				<li data-li="content">
					<ul>
						<li data-li="title">
							{data.name}
						</li>
						<li data-li="description">
							<div dangerouslySetInnerHTML={{ __html: data.description_html }} />
						</li>
					</ul>
				</li>
			</ul>
		)
	}

	const renderContent = () => {

		const description = data.description.replace(/^(.{160}[^\s]*).*/, "$1")

		return (
			<ul className={classes.contentList}>
				<li data-li="image">
					<img src={data.logotype_src} />
				</li>
				<li data-li="content">
					<ul>
						<li data-li="title">
							{data.name}
						</li>
						<li data-li="description">
							{description}...
						</li>
						<li data-li="button">
							<Dialog
								button={(handleOpen) => (
									<Button data-pointer variant="outlined" onClick={handleOpen}>
										Read more
									</Button>
								)}
								title="Details">
								<div>
									{renderDialogContent()}
								</div>
							</Dialog>
						</li>
					</ul>
				</li>
			</ul>
		)
	}

	const renderInfo = () => {

		const list = [
			['Completion', data.build_date],
			['Starting At', format.money(data.start_price, '$')],
			['Location', data.location],
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
				<li data-li="button">
					<Button data-pointer variant="contained" color="secondary" onClick={() => {
						commands.menu.changeMenu('units')
					}}>
						Select unit
					</Button>
				</li>
			</ul>
		)
	}

	return (
		<div>

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


export default OverviewCard
