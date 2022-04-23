import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { env } from 'src/api/'

// styles
import { styled } from 'metalib/styles/'

// material
import Icon from '@mui/material/Icon';

// components
import { Dialog } from 'metaeditor/components/'


const ContentDiv = styled.div(theme => ({
	padding: theme.spacing(3),
	display: 'flex',
	[theme.breakpoints.down('sm')]: {
		flexDirection: 'column',
	},
	'& > [data-list]': {
		'& > [data-li="image"]': {
			marginBottom: theme.spacing(4)
		},
	},
	'& > [data-list="keyboard"]': {
		'& > [data-li="image"]': {
			'& > img': {
				width: '100%'
			},
		},
		'& > [data-li="info"]': {
			display: 'flex',
			justifyContent: 'space-between',
			'& > ul': {
				'& > li': {
					display: 'flex',
					alignItems: 'center',
					marginBottom: theme.spacing(.5),
					'&:last-child': {
						marginBottom: 0,
					},
					'& > span': {
						width: 30,
						height: 30,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: theme.palette.background.default,
						border: `solid 1px ${theme.palette.divider}`,
						borderRadius: theme.shape.borderRadius,
						fontSize: 11,
						// fontWeight: theme.props.fontWeight.semiBold,
					},
					'& > label': {
						marginLeft: theme.spacing(1),
						...theme.typography.body2,
					}
				}
			}
		}
	},
	'& > [data-list="mouse"]': {
		[theme.breakpoints.down('sm')]: {
			display: 'flex',
			marginTop: theme.spacing(4),
			paddingTop: theme.spacing(4),
			borderTop: `solid 1px ${theme.palette.divider}`,
		},
		[theme.breakpoints.up('md')]: {
			marginLeft: theme.spacing(8),
			flex: '1 0 30%',
			maxWidth: '30%',
		},
		'& > [data-li="image"]': {
			[theme.breakpoints.down('sm')]: {
				marginRight: theme.spacing(3),
				maxWidth: '30%',
			},
			'& > img': {
				height: '100%'
			},
		},
		'& > [data-li="info"]': {
			'& > ul': {
				'& > li': {
					display: 'flex',
					alignItems: 'center',
					marginBottom: theme.spacing(1.5),
					'&:last-child': {
						marginBottom: 0,
					},
					'& > span': {
						minWidth: 130,
						borderRadius: theme.shape.borderRadius,
						backgroundColor: theme.palette.background.default,
						border: `solid 1px ${theme.palette.divider}`,
						borderRadius: theme.shape.borderRadius,
						padding: theme.spacing(.5, 1),
						textAlign: 'center',
						fontSize: 11,
						// fontWeight: theme.props.fontWeight.semiBold,
						textTransform: 'uppercase',
					},
					'& > label': {
						marginLeft: theme.spacing(1),
						...theme.typography.body2,
					}
				}
			}
		}
	},
}))


function HelpPanel(props) {
	const refDialog = React.useRef(null)
	const refImageKeyboard = React.useRef(null)

	const [keyboardHeight, setKeyboardHeight] = React.useState(0);

	React.useEffect(() => {

		window.addEventListener('resize', () => {
			setKeyboardHeight(refImageKeyboard?.current?.clientHeight || 0)
		}, true);

	}, [])

	const handleClickOpen = () => {
		refDialog.current.open()
	};

	const handleClose = () => {
		refDialog.current.close()
	};

	const keys_list = [
		['Forward', ['W', 'arrow_drop_up']],
		['Left', ['A', 'arrow_left']],
		['Right', ['D', 'arrow_right']],
		['Backward', ['S', 'arrow_drop_down']],
	]


	const mouse_list = [
		['Left click', 'Look around'],
		['Right click', 'Move perspective'],
		['Scroll', 'Walk forward/backward'],
	]

	const renderContent = () => {
		return (
			<ContentDiv>
				<ul data-list="keyboard">
					<li data-li="image">
						<img ref={refImageKeyboard} src={env.staticPath('player', 'helper', 'keyboard.svg')} />
					</li>
					<li data-li="info">
						<ul>
							{keys_list.map(([label, keys], index) => (
								<li key={index}>
									<span>
										{keys[0]}
									</span>
									<label>
										— {label}
									</label>
								</li>
							))}
						</ul>
						<ul>
							{keys_list.map(([label, keys], index) => (
								<li key={index}>
									<span>
										<Icon>{keys[1]}</Icon>
									</span>
									<label>
										— {label}
									</label>
								</li>
							))}
						</ul>
					</li>
				</ul>
				<ul data-list="mouse">
					<li data-li="image">
						<img src={env.staticPath('player', 'helper', 'mouse.svg')}
							style={{
								maxHeight: keyboardHeight || 'auto',
							}} />
					</li>
					<li data-li="info">
						<ul>
							{mouse_list.map(([label, comment], index) => (
								<li key={index}>
									<span>
										{label}
									</span>
									<label>
										— {comment}
									</label>
								</li>
							))}
						</ul>
					</li>
				</ul>
			</ContentDiv>
		)
	}

	return (
		<div>
			<Dialog
				ref={refDialog}
				title="Help center"
				subtitle={undefined}
				defaultOpen={false}
				closeIcon
				showActions={false}
				maxWidth="lg"
			>
				{renderContent()}
			</Dialog>

			{props.children(handleClickOpen)}
		</div>
	)
}

HelpPanel.propTypes = {
	children: PropTypes.func.isRequired,
};

export default HelpPanel
