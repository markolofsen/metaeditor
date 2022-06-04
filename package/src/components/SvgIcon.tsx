import * as React from 'react'

// ui
import { jss } from '../assets/styled'
import IconButton from 'rsuite/IconButton';
import { TypeAttributes } from 'rsuite/esm/@types/common';

// icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faVolumeHigh,
  faVolumeOff,
  faExpand,
  faQrcode,
  faCompress,
  faPlay,
  faPause,
  faStar,
  faSquareCaretLeft,
  faSquareCaretRight,
  faSquareCaretUp,
  faSquareCaretDown,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons'



const useStyles = jss({
  root: {
    width: ({ size }: any) => size,
    height: ({ size }: any) => size,
    fontSize: ({ size }: any) => size / 1.3,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  }
})

type INames = string | 'question' | 'volumeOn' | 'volumeOff' | 'expand' | 'qrcode' | 'compress' | 'play' | 'pause' | 'star' | 'arrowLeft' | 'arrowRight' | 'arrowUp' | 'arrowDown'

interface PropsSchema {
  name: INames
  size?: number
  button?: boolean
  buttonSize?: TypeAttributes.Size
  disabled?: boolean
  onClick?: Function
}

const defaultProps: PropsSchema = {
  name: 'volumeOn',
  size: 20,
}

export const SvgIcon: React.FC<PropsSchema> = (props: PropsSchema = defaultProps) => {
  const { size, name } = props
  const classes = useStyles({ size })

  const list: any = {
    volumeOn: faVolumeHigh,
    volumeOff: faVolumeOff,
    expand: faExpand,
    qrcode: faQrcode,
    compress: faCompress,
    play: faPlay,
    pause: faPause,
    star: faStar,
    arrowLeft: faSquareCaretLeft,
    arrowRight: faSquareCaretRight,
    arrowUp: faSquareCaretUp,
    arrowDown: faSquareCaretDown,
    question: faQuestion,
  }


  const renderIcon = () => {
    const getIcon = () => {
      if (!list.hasOwnProperty(name)) {
        return <></>
      }
      return list[name]
    }

    return (
      <span className={classes.root}>
        <FontAwesomeIcon icon={getIcon()} />
      </span>
    )
  }

  if (props.button) {
    return (
      <IconButton
        disabled={props.disabled}
        onClick={() => {
          if (typeof props.onClick === 'function') {
            props.onClick()
          }
        }}
        icon={renderIcon()}
        circle
        size={props.buttonSize} />
    )
  }

  return renderIcon()

}
SvgIcon.defaultProps = defaultProps;
