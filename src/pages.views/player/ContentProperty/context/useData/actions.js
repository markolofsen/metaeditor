import React from "react"

// nextjs
import { useRouter } from "next/router"

// api
import { useApi } from '../../hooks/'

// reducers
import reducer from './reducer'

export default function useData() {
  const api = useApi()
  const router = useRouter()

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  React.useEffect(() => {
    loadBuilding()
  }, [])

  const loadBuilding = async (setState) => {
    const building_slug = router.query.slug
    await api.vec_overlay.details_all({ build: building_slug }).then(res => {
      if (res.status === 200) {
        DISPATCHER({ building: res.body })
      } else {
        console.error('Building data not received! Some commands with filtering doesnt work!.....');
      }
    })

  }

  return {
    state,
  }

};
