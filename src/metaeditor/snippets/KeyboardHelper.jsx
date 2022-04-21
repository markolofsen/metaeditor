import * as React from 'react';

// hooks
import { useMedia, useHotkeys } from 'metalib/common/hooks/'
import { isBrowser, isMobile } from 'metalib/common/funcs/getDevice'

// context
import { usePlayer } from '../context/';

// styles
import { styled } from 'metalib/styles/'

// material
import Icon from '@mui/material/Icon';


const size = 15

const RootList = styled.ul(theme => ({
	width: size * 6,
	height: size * 3.5,

	display: 'flex',
	alignItems: 'flex-start',
	justifyContent: 'center',

	'& > li': {
		border: `solid 1px ${theme.palette.divider}`,
		width: size * 1.6,
		height: size * 1.6,
		borderRadius: 4,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		textTransform: 'uppercase',
		fontSize: theme.typography.body2.fontSize,
		overflow: 'hidden',
		transition: theme.transitions.create(['border-color', 'background-color'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),

		'&[data-active="true"]': {
			backgroundColor: theme.palette.divider,
			borderColor: 'rgba(255,255,255, .4)',
			'& > [data-icon]': {
				display: 'block',
			},
			'& > label': {
				display: 'none',
			},
		},
		'& > [data-icon]': {
			// fontSize: theme.props.fontSize.big,
			display: 'none',
		},
		'&:nth-child(1)': {
			flexDirection: 'column',
			marginTop: 0,
			marginLeft: 0,
			// '& > [data-icon]': {
			// 	marginTop: -20,
			// },
		},
		'&:nth-child(2)': {
			flexDirection: 'column-reverse',
			marginTop: size * 2,
			marginLeft: 0,
		},
		'&:nth-child(3)': {
			marginTop: size * 2,
			marginLeft: -size * 4,
		},
		'&:nth-child(4)': {
			flexDirection: 'row-reverse',
			marginTop: size * 2,
			marginLeft: size * 4,
		},
	},

}))


let key_timer = null

function KeyboardHelper() {
	const media = useMedia()
	const player = usePlayer()

	const [active, setActive] = React.useState(null);
	const [isArrows, setIsArrows] = React.useState(false);

	const playerLoaded = player.state.loaded

	React.useEffect(() => {

		if (isBrowser && active) {
			clearTimeout(key_timer)
			key_timer = setTimeout(() => {
				setActive(null)
			}, 1000)
		}

	}, [active])

	// useTimeout (
	//   () => setActive(null),
	//   active ? 1000 : null,
	// );

	const list = {
		up: ['w', 'keyboard_arrow_up'],
		down: ['s', 'keyboard_arrow_down'],
		left: ['a', 'keyboard_arrow_left'],
		right: ['d', 'keyboard_arrow_right'],
	}

	const list_extra = [
		[['up', 'right'], ['w', 'd']],
		[['up', 'left'], ['w', 'a']],
		[['bottom', 'right'], ['s', 'd']],
		[['bottom', 'left'], ['s', 'a']],
	].map(item => {
		item[1] = [item[1].join('+'), item[1].reverse().join('+')]
		return item;
	})
	// const list_extra_obj = Object.entries(list_extra).map(([act, keys]) => (act))


	const list_keys = Object.entries(list).map(([key, value]) => (value[0]))
	const list_arrows = Object.entries(list).map(([key, value]) => (key))

	const list_render = Object.entries(list).map(([name, [key, icon]]) => ({ name, key, icon }))

	for (let key of list_keys) {
		useHotkeys(key, (e, ke) => {
			setActive(key)
			setIsArrows(false)
		}, [])

		useHotkeys(`Shift+${key}`, (e, ke) => {
			setActive(key)
			setIsArrows(false)
		}, [])
	}

	for (let item of list_extra) {
		for (let key of item[1]) {
			useHotkeys(key, (e, ke) => {
				setActive(key)
				setIsArrows(false)
			}, [])

			useHotkeys(`Shift+${key}`, (e, ke) => {
				setActive(key)
				setIsArrows(false)
			}, [])
		}
	}

	for (let key of list_arrows) {
		useHotkeys(key, (e, ke) => {
			setActive(key)
			setIsArrows(true)
		}, [])
	}

	// for(let key of list_arrows) {
	//   useHotkeys(key, (e, ke) => {
	//     setActive(key)
	//   }, [])
	// }


	//  useHotkeys('w',
	//    (event, handler) => {
	//      console.warn('event',event);
	//      console.warn('handler',handler);
	//    },
	//    { filter: () => true },
	//    []
	// )

	// useHotkeys('w', (e, ke) => {
	//    // if(!e.repeat) {
	//    //   console.log(e.repeat);
	//    //   setC(c + 1)
	//    // }
	//    setActive('w')
	//  }, [c])

	// useHotkeys('w', () => setAmount(prevAmount => prevAmount + 100))
	// useHotkeys('ctrl+d', () => setAmount(prevAmount => prevAmount - 100))

	// const isPressed = useIsHotkeyPressed()('w');
	// const pressed = useIsHotkeyPressed()('w'); // Returns true if Return key is pressed down.

	if (!playerLoaded || isMobile || media.down.sm) {
		return (<div />);
	}

	return (
		<RootList>
			{list_render.map((item, index) => (
				<li key={index} data-active={active?.length <= 3 && active?.includes(item.key) || item.name === active}>
					<Icon data-icon>
						{item.icon}
					</Icon>
					<label>
						{item.key}
					</label>
				</li>
			))}
		</RootList>
	);
}

export default KeyboardHelper
