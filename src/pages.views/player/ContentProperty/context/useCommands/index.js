import React from "react"

const Context = React.createContext()
export const useCommands = () => React.useContext(Context)

// classes
import actions from './actions'


function Provider(props) {
  const payload = actions()

	return (
		<Context.Provider value={payload}>
			{props.children}
    </Context.Provider>
	);
};


export default Provider
