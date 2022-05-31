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

interface PropsSchema {
  name: string
  size?: number
  button?: boolean
  buttonSize?: TypeAttributes.Size
  disabled?: boolean
  onClick?: Function
}

const defaultProps: PropsSchema = {
  name: '',
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
