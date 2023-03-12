// ** Icon Imports
import { Icon, IconProps } from '@iconify/react'

// Icons:
// https://icon-sets.iconify.design/mdi/

export default function IconifyIcon({ icon, ...rest }: IconProps) {
  return (
    <Icon icon={icon} fontSize='1.5rem' {...rest} />
  )
}
