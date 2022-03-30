/* Usage

// components
import DraggableObject from 'components/DraggableObject/'

function demo() {
	return (
		<div>
		</div>
	)
}

*/


import * as React from 'react';
import PropTypes from 'prop-types';

// styles
import { styled } from '../../common/styles/'

// material
import Zoom from '@mui/material/Zoom';

// libs
import Draggable from 'react-draggable';

/*
Docs:
https://www.npmjs.com/package/react-draggable
http://reactcommunity.org/react-transition-group/transition#Transition-prop-onExited
*/

const RootDiv = styled.div(theme => ({
	pointerEvents: 'none',
	width: '100%',
	height: '100%',
	transition: theme.transitions.create(['background-color'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	position: 'relative',
	zIndex: theme.zIndex.appBar + 20,
	padding: theme.spacing(2),
	'&[data-active="true"]': {
		backgroundColor: 'rgba(0,0,0, .2)',
	},
}))

const ChildrenDiv = styled.div(theme => ({
	pointerEvents: 'all',
	display: 'inline-block',

}))



function DraggableObject(props) {
	// const refChildren = React.useRef(null)
	// const { width, height, scrollTop, scrollLeft } = useContainerDimensions(refChildren);

	const [active, setActive] = React.useState(false)
	const [mounted, setMounted] = React.useState(false)
	// const [defaultPosition, setDefaultPosition] = React.useState({x: 0, y: 0})

	const refHandleClass = React.useRef(null)

	// React.useEffect(() => {
	//
	// 	if(mounted && props.show) {
	// 		const dp = props.defaultPosition
	// 		if(typeof dp === 'string' && dp === 'center') {
	// 			alert(width)
	// 			setDefaultPosition({
	// 				x: 500,
	// 				y: 500,
	// 			})
	// 		}
	// 	}
	//
	// }, [mounted, props.show])

	React.useEffect(() => {

		if (props.show) {
			window.component_draggable = window?.component_draggable + 1 || 0
			refHandleClass.current = 'draggable_' + window.component_draggable
			setMounted(true)
		}

	}, [props.show])

	const handleClass = refHandleClass.current

	const handleStart = (...args) => {
		console.warn(...args);
		setActive(true)
	}

	const handleStop = (...args) => {
		console.warn(...args);
		setActive(false)
	}

	const handleDrag = (e, data) => {
		console.log('Event: ', e);
		console.log('Data: ', data);
	}

	const CardHandler = (payload) => {
		return (
			<div className={handleClass} style={{ cursor: 'move' }}>
				{payload.children}
			</div>
		)
	}

	if (!mounted) {
		return (<div />)
	}

	return (
		<RootDiv data-active={active}>
			<Draggable
				// offsetParent
				// onMouseDown
				disabled={props.disabled}
				allowAnyClick
				bounds="parent"
				axis="both"
				handle={'.' + handleClass}
				defaultPosition={props.defaultPosition}
				// position={}
				// positionOffset={}
				position={null}
				grid={[1, 1]}
				scale={1}
				onStart={handleStart}
				onDrag={handleDrag}
				onStop={handleStop}>

				<ChildrenDiv>
					<Zoom
						mountOnEnter unmountOnExit
						in={props.show}
						onExited={() => {
							setMounted(false)
						}}

						style={{ transitionDelay: props.show ? '100ms' : '100ms' }}>
						{props.children({ active, CardHandler, handleClass })}
					</Zoom>
				</ChildrenDiv>

			</Draggable>
		</RootDiv>
	);
}

// const defaultPosition_str = PropTypes.oneOf(['center'])
const defaultPosition_xy = PropTypes.exact({
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
})

DraggableObject.propTypes = {
	children: PropTypes.func.isRequired,
	// defaultPosition: PropTypes.oneOfType([defaultPosition_str, defaultPosition_xy]),
	defaultPosition: defaultPosition_xy,
	disabled: PropTypes.bool.isRequired,
	show: PropTypes.bool.isRequired,
};

DraggableObject.defaultProps = {
	defaultPosition: { x: 0, y: 0 }, // accepts strings, like `{x: '10%', y: '10%'}`.
	// defaultPosition: 'center',
	disabled: false,
	show: true,
};

export default DraggableObject
