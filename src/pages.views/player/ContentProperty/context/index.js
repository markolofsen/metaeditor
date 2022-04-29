/* Usage

***** wrapper
// context
import ContextProvider from './context/';

return (
  <ContextProvider>
    {children...}
  </ContextProvider>
)

***** injection
// context
import {
  useLogic,
  useBuilding,
  useStream,
} from './context/';

const logic = useLogic()
const building = useBuilding()
const stream = useStream()

*/


import LayoutProvider, { useLayout } from './useLayout/';
import BuildingProvider, { useBuilding } from './useBuilding/';
import LogicProvider, { useLogic } from './useLogic/';
import UnitsProvider, { useUnits } from './useUnits/';

const Provider = (props) => {
  return (
    <LayoutProvider>
      <BuildingProvider>
        <LogicProvider>
          <UnitsProvider>
            {props.children}
          </UnitsProvider>
        </LogicProvider>
      </BuildingProvider>
    </LayoutProvider>
  )
}

export {
  useLayout,
  useBuilding,
  useLogic,
  useUnits,
}

export default Provider
