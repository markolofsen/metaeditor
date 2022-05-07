import React from "react"

// context
import { useData, useCommands } from '../'

// api
import { useApi } from '../../hooks/'


// reducers
import reducer from './reducer'

export default function useUnits() {
  const api = useApi()
  const commands = useCommands()
  const dataBuilding = useData()

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  const DISPATCHER = (payload) => dispatch({
    type: reducer.KEY.UPDATE,
    payload,
  })

  // Preload data
  React.useEffect(() => {
    // ps_state.player.loaded &&
    if (commands.menu.current === 'units') {
      cls.loadData('plans')
      DISPATCHER({ slider_expanded: false })
    }

  }, [commands.menu.current])


  // Load unit overview data
  React.useEffect(() => {
    if (state.current_unit) {
      cls.loadUnitsOverview(menu.current)
    }

  }, [state.current_unit])

  const menu = new class {
    get current() {
      return state.current_unit;
    }

    changeMenu(current_unit) {
      commands.cmd.method.enter_apartment.emit({ slug: current_unit })
      DISPATCHER({ current_unit })
    }
  }

  const cls = new class {
    constructor() {
      this.building_slug = dataBuilding.state?.building?.overview?.slug
    }

    get payload() {
      return {
        limit: 1000,
        price_min: state.filters.price_interval[0],
        price_max: state.filters.price_interval[1],
      };
    }


    async reloadData() {
      return await this.loadData(state.current_panel)
    }

    async loadData(current_panel) {

      // // Deselect apartment every time
      // await ps_state.commands.select_apartment.reset()

      DISPATCHER({ current_panel })

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
      // await ps_state.commands.filtered_units.send(c => ({units_slugs}))
    }

    async loadPlans() {
      const payload = {
        ...this.payload,
        price_min: undefined,
        price_max: undefined,
      }

      await api.vec_overlay.units_plans_search(this.building_slug, payload).then(res => {
        if (res.status === 200) {
          const data_plans = res.body
          DISPATCHER({ data_plans })

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

      await api.vec_overlay.units_search(this.building_slug, payload).then(res => {
        if (res.status === 200) {
          const data_units = res.body
          DISPATCHER({ data_units })
          this.applyFiltered(data_units.results?.map(item => item.unit_key))
        }
      })
    }

    async loadCommercial() {

      const payload = {
        ...this.payload,
        variant: 'commercial',
      }

      await api.vec_overlay.units_search(this.building_slug, payload).then(res => {
        if (res.status === 200) {
          const data_commercial = res.body
          DISPATCHER({ data_commercial })
          this.applyFiltered(data_commercial.results?.map(item => item.unit_key))
        }
      })
    }

    async loadUnitsOverview(slug) {
      await api.vec_overlay.units_card({ slug }).then(res => {
        if (res.status === 200) {
          DISPATCHER({ data_units_overview: res.body })
        }
      })
    }

  }

  const filters = new class {
    constructor() { }

    DISPATCHER(payload) {
      dispatch({
        type: reducer.KEY.UPDATE_FILTERS,
        payload,
      })
    }

    setFiltersSize(filters_size) {
      DISPATCHER({ filters_size })
    }

    setPriceInterval(price_interval) {
      this.DISPATCHER({ price_interval })
      cls.reloadData()
    }

    setBedrooms(bedrooms) {
      this.DISPATCHER({ bedrooms })
      cls.reloadData()
    }

    setPlanId(plan_id) {
      this.DISPATCHER({ plan_id })
      cls.loadData('units')
    }

    unsetPlanId() {
      this.DISPATCHER({ plan_id: null })
    }

    get getSelectedPlanLabel() {
      const found = _.find(state.data_plans.results, o => o.id === state.filters.plan_id)
      return found?.label || false;
    }

    expandUnits() {
      // const slider_expanded = logic.config.state.slider_expanded ? true : false
      // logic.config.actions.dispatch({slider_expanded: !slider_expanded})
    }
  }

  return {
    state,
    filters,
    menu,
    cls,
  }

};
