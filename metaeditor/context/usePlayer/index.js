import React from "react"

const Context = React.createContext()
export const usePlayer = () => React.useContext(Context)

// context
import { usePS } from '../../components/'


const Provider = (props) => {
	const PS = usePS()

	return (
		<Context.Provider value={PS}>
			{props.children}
		</Context.Provider>
	);
};


export default Provider
