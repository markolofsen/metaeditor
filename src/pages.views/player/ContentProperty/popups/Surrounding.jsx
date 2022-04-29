import React from 'react';
import PropTypes from 'prop-types';

// api
import ApiClass from 'api/methods/'

// context
import { useLogic } from '../context/';

// material
import {
	makeStyles,
} from '@mui/material/styles';
import Icon from '@mui/material/Icon';

// components
import Block from './Block/'


const useStyles = makeStyles((theme) => ({

	rootList: {
		'& > li': {
			marginTop: theme.spacing(.2),
			...theme.typography.subtitle2,
			'&:first-child': {
				marginTop: 0,
			}
		},
		'& > [data-li="title"]': {
			fontSize: theme.typography.body2.fontSize,
			fontWeight: theme.props.fontWeight.semiBold,
			marginBottom: theme.spacing(1.5),
		},
		'& > [data-li="item"]': {
			display: 'flex',
			alignItems: 'center',
			marginTop: theme.spacing(.5),
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
		}
	},

}));


function Popup(props) {
	const classes = useStyles();
	const logic = useLogic();

	const [data, setData] = React.useState(false)

	/* OPEN-CLOSE popup */

	// const cmd_caller = logic.config.PS.callback_caller
	const cmd_loading = logic.config.PS.callback_loading
	const cmd_data = logic.config.PS.cmd.select_surrounding?.data
	const cmd_slug = cmd_data?.value.slug

	React.useEffect(() => {

		return () => {
			setData(false)
			logic.config.PS.cmd.select_surrounding.reset()
		}
	}, [])

	React.useEffect(() => {

		if (!cmd_slug || cmd_loading) {
			setData(false)
			return;
		}

		ApiClass().vec.vec_overlay.surroundings_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})

	}, [cmd_loading, cmd_slug])


	const renderContent = () => {
		if (!data) return;

		return (
			<ul className={classes.rootList}>
				<li data-li="title">
					{data.name}
				</li>
				<li data-li="item">
					<label>Rating:</label>
					<span>
						{data.rating} <Icon data-icon>star</Icon>
					</span>
				</li>
				{data.distance > 0 && (
					<li data-li="item">
						<label>Distance:</label> {data.distance} km.
					</li>
				)}
			</ul>
		)
	}

	return (
		<div>
			<Block
				data={data}
				show={data ? true : false}
				title="Surrounding"
				image={data?.image}
				button={data?.allow_walk}
				onClick={() => {
					// logic.config.PS.cmd.enter_apartment({slug: item.unit_key})
				}}
				onClose={() => {
					setData(false)
					props.onExit()
				}}
			>
				{renderContent()}
				{/* JSON.stringify(data) */}
			</Block>
		</div>
	)
}


Popup.propTypes = {
	onExit: PropTypes.func.isRequired,
};

export default Popup
