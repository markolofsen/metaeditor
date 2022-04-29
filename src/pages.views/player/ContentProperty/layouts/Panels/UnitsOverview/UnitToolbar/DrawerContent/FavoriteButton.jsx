import React from 'react';
import PropTypes from 'prop-types';

// api
import ApiClass from 'api/methods/'

// hooks
import { useRouter } from 'hooks/'


// material
import {
	makeStyles,
} from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';

// blocks
import UniversalButton from '../../../../components/UniversalButton'



const useStyles = makeStyles((theme) => ({

}));

function FavoriteButton(props) {

	const classes = useStyles();
	const router = useRouter();

	const [selected, setSelected] = React.useState(false)

	// React.useEffect(() => {
	// 	loadData()
	// }, [])

	// React.useEffect(() => {
	// 	if(unit_key) {
	// 		loadData()
	// 	}
	// }, [unit_key])

	// const loadData = () => {
	// 	ApiClass().vec.vec_unit_favorite.read(unit_key).then(res => {
	// 		if(res.status === 200) {
	// 			setSelected(true)
	// 		}
	// 	})
	// }

	const handleClick = () => {

		// if(selected) {
		// 	ApiClass().vec.vec_unit_favorite.delete(unit_key).then(res => {
		// 		if(res.status === 200) {
		// 			setSelected(false)
		// 		}
		// 	})
		// } else {
		// 	ApiClass().vec.vec_unit_favorite.update(unit_key).then(res => {
		// 		if(res.status === 200) {
		// 			setSelected(true)
		// 		}
		// 	})
		// }

	}

	return (
		<div>

			<UniversalButton
				onClick={handleClick}
				iconOn={selected ? 'favorite' : 'favorite_border'}
				tooltip="Favorite"
				placement="bottom"
			/>

		</div>
	)
}


FavoriteButton.propTypes = {
	unit_key: PropTypes.string,
};

FavoriteButton.defaultProps = {
};


export default FavoriteButton
