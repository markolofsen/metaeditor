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

	},

}));


function Popup(props) {
	const classes = useStyles();
	const logic = useLogic();

	const [data, setData] = React.useState(false)

	/* OPEN-CLOSE popup */

	// const cmd_caller = logic.config.PS.callback_caller
	const cmd_loading = logic.config.PS.callback_loading
	const cmd_data = logic.config.PS.cmd.select_amenity?.data
	const cmd_slug = cmd_data?.value.slug

	React.useEffect(() => {
		return () => {
			setData(false)
			logic.config.PS.cmd.select_amenity.reset()
		}
	}, [])

	React.useEffect(() => {

		if (!cmd_slug || cmd_loading) {
			setData(false)
			return;
		}

		// if(!cmd_slug) return ;

		ApiClass().vec.vec_overlay.amenities_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})

		// if(cmd_caller === 'stream') {
		// 	logic.config.PS.move_camera_to_amenity(cmd_slug)
		// }

	}, [cmd_loading, cmd_slug])

	const renderContent = () => {
		if (!data) return;

		return (
			<ul className={classes.rootList}>
				<li data-li="title">
					{data.name}
				</li>
			</ul>
		)
	}

	return (
		<div>
			<Block
				data={data}
				show={data ? true : false}
				title="Amenity"
				image={data?.image}
				button={data?.allow_walk}
				onClick={async () => {
					await logic.config.PS.enter_amenity(data.slug)
					logic.config.actions.changeMenu('amenities_overview')
				}}
				onClose={async () => {
					setData(false)
					await logic.config.PS.deselect_amenity()
				}}
			>
				{renderContent()}
				{/* JSON.stringify(data) */}
			</Block>
		</div>
	)
}


Popup.propTypes = {
	// blockSettings: PropTypes.object,
};

export default Popup
