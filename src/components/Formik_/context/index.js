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
import {useContext} from './context/';

const context = useContext()

*/



import BaseProvider, {useContext} from './useContext/'; export {useContext}

const Provider = (props) => {
  return (
    <BaseProvider {...props}>
      {props.children}
    </BaseProvider>
  )
}

export default Provider
