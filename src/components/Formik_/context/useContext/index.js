import React from "react"

const Context = React.createContext()
export const useContext = () => React.useContext(Context)

// classes
import actions from './actions'


function Provider(props) {

  const payload = actions(props)

	return (
		<Context.Provider value={payload}>
			{props.children}
    </Context.Provider>
	);
};


export default Provider
