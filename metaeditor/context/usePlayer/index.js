import React from "react"

const Context = React.createContext()
export const usePlayer = () => React.useContext(Context)

// classes
import actions from './actions'

const Provider = (props) => {
	const payload = actions();

	return (
		<Context.Provider value={payload}>
			{props.children}
		</Context.Provider>
	);
};


export default Provider
