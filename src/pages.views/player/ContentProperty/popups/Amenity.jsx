import * as React from 'react';
import PropTypes from 'prop-types';

// api
import { useApi } from '../hooks/'

// context
import { useCommands, useData } from '../context/';

// material
import { makeStyles } from '@mui/styles'
import Icon from '@mui/material/Icon';

// components
import Block from './Block/'


const useStyles = makeStyles((theme) => ({

	rootList: {

	},

}));


function Popup(props) {
	const api = useApi()
	const classes = useStyles();
	const commands = useCommands();
	const dataBuilding = useData()

	const { overview } = dataBuilding.state.building

	const [data, setData] = React.useState(false)

	/* OPEN-CLOSE popup */

	// const cmd_caller = logic.config.PS.callback_caller
	const cmd_slug = commands.amenities.current

	React.useEffect(() => {
		return () => {
			setData(false)
			// logic.config.PS.cmd.select_amenity.reset()
		}
	}, [])

	React.useEffect(() => {

		if (!cmd_slug) {
			setData(false)
			return;
		}


		api.vec_overlay.amenities_card({ slug: cmd_slug }).then(res => {
			if (res.status === 200) {
				setData(res.body)
			}
		})

		// if(cmd_caller === 'stream') {
		// 	logic.config.PS.move_camera_to_amenity(cmd_slug)
		// }

	}, [cmd_slug])

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
					commands.amenities.changeMenu(data.slug)
					commands.menu.changeMenu('amenities_overview')
					commands.cmd.method.enter_amenity.emit({ slug: data.slug })
				}}
				onClose={async () => {
					setData(false)
					commands.amenities.changeMenu(false)
					commands.cmd.method.deselect_amenity.emit()
					commands.cmd.method.amenities_overview.emit({ slug: overview.slug })
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
