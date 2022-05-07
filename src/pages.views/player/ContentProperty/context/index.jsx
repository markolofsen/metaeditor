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
import {useData, useCommands} from './context/';

const data = useData()
const commands = useCommands()

*/


import LayoutProvider, { useLayout } from './useLayout/';
import DataProvider, { useData } from './useData/';
import CommandsProvider, { useCommands } from './useCommands/';
import UnitsProvider, { useUnits } from './useUnits/';

const Provider = (props) => {
  return (
    <LayoutProvider>
      <DataProvider>
        <CommandsProvider>
          <UnitsProvider>
            {props.children}
          </UnitsProvider>
        </CommandsProvider>
      </DataProvider>
    </LayoutProvider>
  )
}

export {
  useLayout,
  useData,
  useUnits,
  useCommands,
}

export default Provider
