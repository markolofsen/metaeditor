import React from "react"

// reducers
import reducer from './reducer'

// context
import { useData } from '../'

import client from './client/'


export default function useCommands() {
  const dataBuilding = useData()

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const building_slug = dataBuilding.state?.building?.overview?.slug

  const menu = new class {


    get current() {
      return state.current_menu;
    }

    changeMenu(current_menu) {
      DISPATCHER({ current_menu })

      // resets...
      amenities.changeMenu(false)

      switch (current_menu) {
        case 'overview':
          cmd.method.building_overview.emit({ slug: building_slug })
          break;
        case 'amenities':
          cmd.method.amenities_overview.emit({ slug: building_slug })
          // this.filtered_amenities([])
          break;
        case 'surroundings':
          cmd.method.surroundings_overview.emit({ slug: building_slug })
          // this.filtered_surroundings([])
          break;
        case 'units':
          cmd.method.unit_search_overview.emit({ slug: building_slug })
          // this.filtered_surroundings([])
          break;
      }

    }
  }

  const amenities = new class {

    get current() {
      return state.current_amenity;
    }

    changeMenu(current_amenity) {
      DISPATCHER({ current_amenity })
    }
  }

  const cmd = new class {

    get method() {
      // console.error('@@@', client.commands.enter_amenity);
      // client.commands.enter_amenity.emit({slug})
      return client.commands
    }
  }

  return {
    state,
    menu,
    amenities,
    cmd,
  }
};
