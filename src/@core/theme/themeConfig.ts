import { Mode, Skin, ThemeColor } from './types'

export interface ThemeConfig {
  mode: Mode
  skin: Skin
  themeColor: ThemeColor
  disableRipple: boolean
}

const themeConfig: ThemeConfig = {
  mode: 'dark',
  skin: 'bordered',
  themeColor: 'primary',
  disableRipple: false,
}

export default themeConfig