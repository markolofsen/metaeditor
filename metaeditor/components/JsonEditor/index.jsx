/* Usage

import JsonEditor from 'components/JsonEditor/'

function demo() {
	return (
		<JsonEditor
			content="..."
			height={300}
			onChange={() => {}}
			viewOnly={false}
		 />
	)
}

*/

import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from 'metalib/styles/'

// material
import MuiFormLabel from '@mui/material/FormLabel';

//Using source code
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";


const RootDiv = styled.div(theme => ({
	border: `solid 1px ${theme.palette.divider}`,
	borderRadius: theme.shape.borderRadius,
	'& > div': {
		// width: '100% !important',
	},
}))

const FormLabel = styled.custom(MuiFormLabel, theme => ({
	display: 'block',
	padding: theme.spacing(1),
	...theme.typography.caption,
}))



function JsonEditor(props) {

	const [value, setValue] = React.useState({})

	React.useEffect(() => {

		// Preparing initial value

		switch (typeof props.content) {
			case 'string':
				try {
					const newValue = JSON.parse(props.content)
					setValue(newValue)
				} catch (err) { }
				break;
			case 'object':
				try {
					const newValue = JSON.parse(JSON.stringify(props.content))
					setValue(newValue)
				} catch (err) { }
				break;
		}

	}, [props.content])

	const handleUpdate = ({ json, plainText, ...other }) => {
		// console.warn('json', json);
		// console.warn('plainText', plainText);
		// console.warn('other', other);
		// props.onChange(JSON.parse(json))

		try {
			json = JSON.parse(json)
		} catch (err) { }

		props.onChange(json)
	}

	return (
		<RootDiv>

			{props.label ? (
				<FormLabel>
					{props.label}
				</FormLabel>
			) : ''}

			<JSONInput
				onChange={handleUpdate}
				onBlur={handleUpdate}
				onKeyPressUpdate
				placeholder={value} // data to display
				theme="dark_vscode_tribute"
				locale={locale}
				viewOnly={props.viewOnly}
				colors={{
					background: 'transparent',
					string: "#DAA520" // overrides theme colors with whatever color value you want
				}}
				width={'100%'}
				height={props.height}
			/>
		</RootDiv>

	)

}

JsonEditor.propTypes = {
	content: PropTypes.any.isRequired,
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	onChange: PropTypes.func.isRequired,
	viewOnly: PropTypes.bool,
	label: PropTypes.any,
}

JsonEditor.defaultProps = {
	height: 300,
	viewOnly: false,
	label: '',
}

export default JsonEditor
