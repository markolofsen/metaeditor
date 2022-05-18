// global styles
import 'rsuite/dist/rsuite.min.css'

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
