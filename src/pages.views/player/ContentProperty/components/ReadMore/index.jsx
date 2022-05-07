/* Usage

// material
import Button from '@mui/material/Button';

// components
import ReadMore from 'components/ReadMore/'


function demo(props) {

	const data = 'Some huge text '.repeat(333)

	return (
		<ReadMore data={data} size={40} maxLength={150}>
			{({short, onClick, content}) => (
				<div>
					<div>
						{content}
					</div>
					<Button variant="outlined"  onClick={onClick}>
						{short ? 'Show' : 'Close'}
					</Button>
				</div>
			)}
		</ReadMore>
	)
}
*/

import * as React from 'react';
import PropTypes from 'prop-types';

// material
import { makeStyles } from 'metalib/styles'
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';


const useStyles = makeStyles(theme => ({
	root: {

	}
}))

function ReadMore(props) {

	const classes = useStyles();
	const [short, setShort] = React.useState(false)
	const [closed, setClosed] = React.useState(false)

	const isBigText = props.data && props.data.length > props.maxLength

	React.useEffect(() => {
		if (isBigText) {
			setShort(true)
			setClosed(true)
		}

	}, [])

	const renderContent = () => {
		const getData = () => {
			if (short && isBigText && closed) {
				return props.data.substr(0, props.maxLength) + '...';
			}
			return props.data;
		}

		const content = (
			<Collapse
				in={!short}
				collapsedSize={props.size}
				onExited={(node, done) => {
					setClosed(true)
				}}
				onEntered={(node, done) => {
					setClosed(false)
				}}>
				{getData()}
			</Collapse>
		)

		return props.children({
			short,
			onClick: () => setShort(c => !c),
			content,
			showButton: isBigText,
		})
	}

	return (
		<div className={classes.root}>
			{renderContent()}
		</div>
	);
}



ReadMore.propTypes = {
	data: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
	maxLength: PropTypes.number.isRequired,
	size: PropTypes.number.isRequired,
	children: PropTypes.func.isRequired,
};

ReadMore.defaultProps = {
	maxLength: 100,
	size: 0,
};

export default ReadMore
