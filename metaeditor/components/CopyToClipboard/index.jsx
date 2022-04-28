/* Usage

// material
import Button from '@mui/material/Button'

// components
import CopyToClipboard from 'components/CopyToClipboard/'

function demo() => {

	return (
		<CopyToClipboard text={'data...'}>
			{({copied, label}) => (
				<Button disabled={copied}>
					{label}
				</Button>
			)}
		</CopyToClipboard>
	)
}

*/

import * as React from 'react';
import PropTypes from 'prop-types';

// libs
import { CopyToClipboard } from 'react-copy-to-clipboard';



function CopyComponent({ text, ...props }) {

	const refTimer = React.useRef(null)
	const [copied, setCopied] = React.useState(false);

	const onCopy = () => {
		setCopied(true)

		clearTimeout(refTimer.current)
		refTimer.current = setTimeout(() => {
			setCopied(false)
		}, 3000)

	}

	const getText = typeof text === 'undefined' ? 'Error' : text


	return (
		<div onClick={(event) => {
			event.stopPropagation()
			event.preventDefault()

			if (typeof props.onClick === 'function') props.onClick()

		}}>
			<CopyToClipboard text={getText} onCopy={onCopy}>
				{props.children({
					copied,
					label: copied ? 'Copied to clipboard' : 'Copy'
				})}
			</CopyToClipboard>
		</div>
	)

}



CopyComponent.propTypes = {
	children: PropTypes.func.isRequired,
	text: PropTypes.any.isRequired,
	onClick: PropTypes.func,
};
CopyComponent.defaultProps = {}

export default CopyComponent;
