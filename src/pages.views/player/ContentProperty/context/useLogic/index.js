import React from "react"

const Context = React.createContext()
export const useLogic = () => React.useContext(Context)

// classes
import useConfig from './useConfig/'



function Provider(props) {

  const payload = {
    config: useConfig(),
  }

	return (
		<Context.Provider value={payload}>
			{props.children}
    </Context.Provider>
	);
};


export default Provider
