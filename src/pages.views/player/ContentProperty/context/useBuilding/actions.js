import React from "react"

// nextjs
import { useRouter } from "next/router"

// reducers
import reducer from './reducer'


// api
import { useApi } from '../../hooks/'


function useBuilding() {
  const api = useApi()
  const router = useRouter()
  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  React.useEffect(() => {

    loadBuilding()

  }, [])

  const loadBuilding = async (setState) => {
    const building_slug = router.query.slug
    await api.vec_overlay.details_all({ build: building_slug }).then(res => {
      if (res.status === 200) {
        const payload = res.body
        dispatch({ type: reducer.KEY.ADD_BUILDING_DATA, payload })
      } else {
        console.error('Building data not received! Some commands with filtering doesnt work!.....');
      }
    })

  }


  return {
    state,
  }
};


export default useBuilding
