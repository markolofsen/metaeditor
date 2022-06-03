import * as React from 'react'

// snippets
import { PlayerPropsSchema } from "./snippets/Player";
export type { PlayerPropsSchema }
export { Player } from "./snippets/Player";

// context
export { ContextProvider, usePlayer, useSystem } from './context/';

// components
export { CustomDrawer } from './components/Drawer';
export { CustomModal } from './components/Modal';
export { SvgIcon } from "./components/SvgIcon";

// styles
export { jss, media, colors } from "./assets/styled";

// config
export { config } from "./assets/config";

// hooks
export { Request } from './hooks/useApi/useRequest'
export { useStorage } from "./hooks/useStorage"
export { useMedia } from "./hooks/useMedia"
