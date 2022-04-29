import React from "react"

// reducers
import reducer from './reducer'

// context
import {
  useBuilding,
  usePixelStreaming,
  useLogic,
} from '../../context/';

// api
import { useApi } from '../../hooks/'



function useUnits() {
  const api = useApi()
  const building = useBuilding();
  const logic = useLogic();

  const refPrevState = React.useRef(null)

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const ps_state = {} //pixelStreaming.player.state
  // // const ps_commands = ps_state.commands

  // React.useEffect(() => {
  //   // ps_state.player.loaded &&
  //   if (logic.config.state.current_menu === 'units') {
  //     cls.loadData('plans')
  //     logic.config.actions.dispatch({ slider_expanded: false })
  //   }

  // }, [logic.config.state.current_menu])


  const cls = new class {
    constructor() {
      this.building = building.state.building_slug
    }

    get payload() {
      return {
        limit: 1000,
        price_min: state.filters.price_interval[0],
        price_max: state.filters.price_interval[1],
      };
    }

    dispatch(payload) {
      dispatch({ type: reducer.KEY.UPDATE, payload })
    }

    dispatchPanel(current_panel) {
      dispatch({ type: reducer.KEY.SWITCH_PANEL, payload: current_panel })
    }

    async reloadData() {
      return await this.loadData(state.current_panel)
    }

    async loadData(current_panel) {

      // Deselect apartment every time
      await ps_state.commands.select_apartment.reset()

      this.dispatchPanel(current_panel)

      if (current_panel === 'plans') {
        await this.loadPlans()

      } else if (current_panel === 'units') {
        await this.loadUnits()

      } else if (current_panel === 'commercial') {
        await this.loadCommercial()
      }

    }

    // Show filtered units on stream
    async applyFiltered(units_slugs) {
      units_slugs = units_slugs.join(',')
      // console.error('@@units_slugs',units_slugs);
      await ps_state.commands.filtered_units.send(c => ({ units_slugs }))
    }

    async loadPlans() {
      const payload = {
        ...this.payload,
        price_min: undefined,
        price_max: undefined,
      }

      await api.vec_overlay.units_plans_search(this.building, payload).then(res => {
        if (res.status === 200) {
          const data_plans = res.body
          this.dispatch({ data_plans })

          let list = []
          data_plans.results?.map(plan => {
            plan.units_list.map(item => list.push(item))
          })

          this.applyFiltered(list)

        }
      })
    }

    async loadUnits() {
      const payload = {
        ...this.payload,
        plan_id: state.filters.plan_id,
        bedrooms: state.filters.bedrooms,
      }

      await api.vec_overlay.units_search(this.building, payload).then(res => {
        if (res.status === 200) {
          const data_units = res.body
          this.dispatch({ data_units })
          this.applyFiltered(data_units.results?.map(item => item.unit_key))
        }
      })
    }

    async loadCommercial() {

      const payload = {
        ...this.payload,
        variant: 'commercial',
      }

      await api.vec_overlay.units_search(this.building, payload).then(res => {
        if (res.status === 200) {
          const data_commercial = res.body
          this.dispatch({ data_commercial })
          this.applyFiltered(data_commercial.results?.map(item => item.unit_key))
        }
      })
    }

    async loadUnitsOverview(slug) {
      await api.vec_overlay.units_card({ slug }).then(res => {
        if (res.status === 200) {
          this.dispatch({ data_units_overview: res.body })
        }
      })
    }

  }


  const filters = new class {
    constructor() { }

    dispatch(payload) {
      dispatch({ type: reducer.KEY.UPDATE_FILTERS, payload })
    }

    setFiltersSize(filters_size) {
      this.dispatch({ filters_size })
    }

    setPriceInterval(price_interval) {
      this.dispatch({ price_interval })
      cls.reloadData()
    }

    setBedrooms(bedrooms) {
      this.dispatch({ bedrooms: bedrooms })
      cls.reloadData()
    }

    setPlanId(plan_id) {
      this.dispatch({ plan_id })
      cls.loadData('units')
    }

    unsetPlanId() {
      this.dispatch({ plan_id: null })
    }

    get getSelectedPlanLabel() {
      const found = _.find(state.data_plans.results, o => o.id === state.filters.plan_id)
      return found?.label || false;
    }

    expandUnits() {
      const slider_expanded = logic.config.state.slider_expanded ? true : false
      logic.config.actions.dispatch({ slider_expanded: !slider_expanded })
    }
  }


  return {
    state,
    cls,
    filters,
  }
};


export default useUnits
