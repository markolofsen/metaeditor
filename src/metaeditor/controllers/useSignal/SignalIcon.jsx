import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import Icon from '@mui/material/Icon';
import MuiIconButton from '@mui/material/IconButton';


const IconButton = styled.custom(MuiIconButton, theme => ({

	'&[data-size="small"]': {
		padding: 8,
	},
	'&[data-size="medium"]': {
		//
	},
	'&[data-size="large"]': {
		'& .material-icons': {
			fontSize: 50,
		},
	},

}))


function SignalIcon({ value, ...props }) {

	const icons_variant = {
		1: 'signal_wifi_bad',
		2: 'signal_wifi_statusbar_null',
		3: 'signal_wifi_statusbar_4_bar',
	}

	return (
		<IconButton {...props} data-size={props.size}>
			<Icon>{icons_variant[value]}</Icon>
		</IconButton>
	);

}


SignalIcon.propTypes = {
	size: PropTypes.string.isRequired,
};

SignalIcon.defaultProps = {
	size: 'medium'
};


export default SignalIcon
