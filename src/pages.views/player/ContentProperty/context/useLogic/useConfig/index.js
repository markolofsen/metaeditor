import React from "react"

// api
import { env } from 'config/'

// reducers
import reducer from './reducer'

// context
import { useBuilding, useUnits } from '../../../context/'

// utils
import { useUnload } from 'metalib/common/hooks/'



function useConfig() {
  const building = useBuilding();
  const units = useUnits();

  const [state, dispatch] = React.useReducer(reducer.reducer, reducer.initialState);

  useUnload(e => {
    e.preventDefault();
    e.returnValue = '';
  });

  const data = new class {

    get menu_list() {
      const list = [
        {
          label: 'Overview',
          slug: 'overview',
        },
        {
          label: 'Amenities',
          slug: 'amenities',
        },
        {
          label: 'Surroundings',
          slug: 'surroundings',
        },
        {
          label: 'Units',
          slug: 'units',
        },
      ]

      return list;
    }

  }

  const actions = new class {
    constructor() {
    }

    dispatch(payload) {
      dispatch({ type: reducer.KEY.UPDATE, payload })
    }

    setAppbarSize(appbar_size) {
      this.dispatch({ appbar_size })
    }

    changeMenu(slug) {

      if (env.isDev) {
        this.dispatch({ current_menu: slug })
      }

      // // TODO: hack for UI play-button at top corner
      // this.dispatch({outdoor_rotate: slug === 'overview' ? true : false})


      PS.handleMenu(slug, () => {
        this.dispatch({ current_menu: slug, slider_expanded: false })
      })
    }

    switchInterface() {
      this.dispatch({ show_interface: !state.show_interface })
    }
  }

  const PS = new class {
    constructor() {
      this.building_slug = building.state.building_slug
    }

    get state() {
      // return pixelStreaming.player.state
    }

    get compute() {
      // return pixelStreaming.player.compute
    }

    get cmd() {
      return [] //this.state.commands
    }

    get callback_loading() {
      return this.compute.callback_loading
    }

    get callback_caller() {
      return this.state.player.callback_caller
    }

    get loaded() {
      return this.state.player.loaded
    }

    get mouse_moving() {
      return this.state.player.mouse_moving
    }

    async onStart() {

      this.cmd.building_overview.send(c => ({ slug: this.building_slug })).then(res => {
        if (res) { }
      }).catch((err) => {
        console.error('Error in onStart():', 'no callback');
      })

      this.parameter.invertX()
      this.parameter.invertY()
      this.parameter.iconsSize()

    }

    get zoom() {

      // desc: 'direction: “in“, “out“ / type: “start“, “stop“ / if “stop” not emitted - stops at mix/max zoom range value',

      const zoom_out = () => {
        this.cmd.outdoor_zoom.send(c => ({ direction: 'out', type: 'start' }))
      }
      const zoom_in = () => {
        this.cmd.outdoor_zoom.send(c => ({ direction: 'in', type: 'start' }))
      }
      return { out: zoom_out, in: zoom_in };
    }


    get parameter() {

      const make = (parameter_name, parameter_value) => {
        // console.error('@@@', parameter_name, parameter_value);
        this.cmd.set_parameter.send(c => ({ parameter_name, parameter_value }))
      }

      const invertX = () => make('invert_x_axis', 1) // 1 - inverse / 0 - default
      const invertY = () => make('invert_y_axis', 1) // 1 - inverse / 0 - default
      const iconsSize = () => make('surroundings_icons_size_multiplier', 1.01) // 1.0 // normal size

      return {
        invertX,
        invertY,
        iconsSize,
      };

    }


    async handleMenu(slug, cb_before) {

      if (slug === false) {
        cb_before()
        return;
      }

      let method = false
      let cb_after = () => { }

      if (slug === 'overview') {
        method = 'building_overview'
      }
      if (slug === 'amenities') {
        method = 'amenities_overview'
        cb_after = () => this.filtered_amenities([])
      }
      if (slug === 'surroundings') {
        method = 'surroundings_overview'
        cb_after = () => this.filtered_surroundings([])
      }
      if (slug === 'units') {
        method = 'unit_search_overview'
      }

      if (typeof this.cmd[method] === 'undefined') {
        cb_before()
        return;
      }


      let complete = false
      await this.cmd[method].send(c => ({ slug: this.building_slug })).then(res => {
        if (res) complete = true
      }).catch((err) => {
        console.error('Error in handleMenu():', 'no callback');
      })

      cb_before()
      if (complete) cb_after()

    }


    async select_apartment(slug) {
      await this.cmd.select_apartment.send(c => ({ slug }))
      await this.cmd.move_camera_to_apartment.send(c => ({ slug }))
    }

    async filtered_units(units_slugs = []) {

      if (units_slugs.length === 0) {
        units_slugs = units.cls.getCurrentSlugs()
      }

      units_slugs = units_slugs.join(',')
      await this.cmd.filtered_units.send(c => ({ units_slugs }))
    }

    async deselect_apartment() {
      await this.cmd.select_apartment.reset()
      await this.cmd.deselect_apartment.send(c => { })
    }

    async enter_apartment(slug) {
      // console.error('@', await this.cmd);

      await this.cmd.enter_apartment.send(c => ({ slug }))
      await this.cmd.select_apartment.reset()
    }

    async select_surrounding(slug) {
      await this.cmd.select_surrounding.send(c => ({ slug }))
      await this.move_camera_to_surrounding(slug)
    }

    async deselect_surrounding(slug) {
      await this.cmd.select_surrounding.reset()
      await this.cmd.deselect_surrounding.send(c => { })
    }

    async move_camera_to_surrounding(slug) {
      await this.cmd.move_camera_to_surrounding.send(c => ({ slug }))
    }

    async filtered_surroundings(slugs = []) {
      if (slugs.length === 0) {
        building.state.building_data?.surroundings?.map(group => {
          group.items.map(item => slugs.push(item.slug))
        })
      }
      slugs = slugs.join(',')
      await this.cmd.select_surrounding.reset()
      await this.cmd.surroundings_overview.send(c => ({ slug: this.building_slug }))
      await this.cmd.filtered_surroundings.send(c => ({ slugs }))
    }

    async move_camera_to_amenity(slug) {
      await this.cmd.move_camera_to_amenity.send(c => ({ slug }))
    }

    async filtered_amenities(slugs = []) {
      if (slugs.length === 0) {
        slugs = building.state.building_data?.amenities?.map(item => item.slug) || []
      }
      slugs = slugs.join(',')
      // await this.amenities_overview()
      await this.cmd.select_amenity.reset()
      await this.cmd.amenities_overview.send(c => ({ slug: this.building_slug }))
      await this.cmd.filtered_amenities.send(c => ({ slugs }))
    }

    async select_amenity(slug) {
      await this.cmd.select_amenity.send(c => ({ slug }))
      await this.move_camera_to_amenity(slug)
    }

    async deselect_amenity() {
      await this.cmd.select_amenity.reset()
      await this.cmd.deselect_amenity.send(c => { })
    }

    async enter_amenity(slug) {
      await this.cmd.enter_amenity.send(c => ({ slug }))
    }

    async leave_amenity(slug) {
      actions.changeMenu('amenities')

      await this.cmd.leave_amenity.send(c => ({}))
      this.cmd.enter_amenity.reset()
    }

    async outdoor_rotate() {
      actions.changeMenu('overview')

      const outdoor_rotate = !state.outdoor_rotate
      await this.cmd.outdoor_rotate.send(c => ({ slug: outdoor_rotate ? 1 : 0 }))
    }

    async change_day_time(hour) {
      await this.cmd.change_day_time.send(c => ({ hour }))
    }

    async apartment_interior(slug) {
      await this.cmd.apartment_interior.send(c => ({ slug }))
    }

    async teleport_to_point(slug) {
      await this.cmd.teleport_to_point.send(c => ({ slug }))
    }

    async camera_vertical_bind(position) {
      await this.cmd.camera_vertical_bind.send(c => ({ slug: this.building_slug, position }))
    }


    // async amenities_overview() {
    //   await this.filtered_amenities([])
    // }

    // // stream callbacks
    // get amenity_slug() {
    //   return this.cmd.select_amenity.data.value.slug;
    // }

  }

  return {
    state,
    data,
    actions,
    PS,
  }

};


export default useConfig
