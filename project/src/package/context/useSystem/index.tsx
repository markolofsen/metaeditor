import * as React from "react"

export const AppContext = React.createContext<Partial<any>>({});
export const useSystem = () => React.useContext(AppContext)

// classes
import { useActions } from './useActions'

const Provider = (props: any) => {
	const actions = useActions();

	return (
		<AppContext.Provider value={actions}>
			{props.children}
		</AppContext.Provider>
	);
};


export default Provider