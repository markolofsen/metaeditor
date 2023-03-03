// ** Type Imports
import { ReactNode } from 'react'
import { PaletteMode } from '@mui/material'
import { Settings } from 'src/@core/context/settings/context'

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar'

export type Skin = 'default' | 'bordered'

export type Mode = PaletteMode | 'semi-dark'

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'

export type BlankLayoutProps = {
  children: ReactNode
}

export type BlankLayoutWithAppBarProps = {
  children: ReactNode
}

export type LayoutProps = {
  hidden: boolean
  settings: Settings
  children: ReactNode
  contentHeightFixed?: boolean
  saveSettings: (values: Settings) => void
}
