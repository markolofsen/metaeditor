import React from "react"

// config
import { env } from 'config/'

// context
import { usePlayer } from 'metaeditor/context/';

// reducers
import reducer from './reducer'

// hooks
import { useSound } from 'metalib/common/hooks/'


const actions = () => {
  const player = usePlayer()
  const [state, dispatch_] = React.useReducer(reducer.reducer, reducer.initialState);

  const soundClick = useSound(env.staticPath('sounds', 'mouse_click.mp3'))

  const dispatch = (payload) => dispatch_({
    type: reducer.KEY.UPDATE,
    payload,
  })

  const dispatchComponent = (key, payload) => dispatch_({
    type: reducer.KEY.COMPONENT,
    payload: { [key]: payload },
  })



  const cls = new class {
    get state() {
      return state;
    }

    get sounds() {
      const play = obj => {
        if (player.state.settings.volume) {
          obj.play()
        }
      }

      return {
        click: () => play(soundClick),
      }
    }

    handleMenu(current_menu) {
      this.draggableCard.close() //hack for draggable component
      this.handleDrawer.close() //hack for drawer component

      current_menu = state.current_menu === current_menu ? false : current_menu
      if (current_menu) this.sounds.click()
      dispatch({ current_menu, ui_visible: true })
    }

    handleUiVisible() {
      this.draggableCard.close() //hack for draggable component

      const ui_visible = !state.ui_visible
      if (ui_visible) this.sounds.click()
      dispatch({ ui_visible })
    }

    get handleDrawer() {
      const prevSlug = state.components.streamDrawer.slug
      return {
        slug: prevSlug,
        open: (slug) => {
          this.sounds.click()

          dispatchComponent('streamDrawer', { slug: false, active: false })
          if (slug != prevSlug) {
            setTimeout(() => dispatchComponent('streamDrawer', { slug, active: true }), 300)
          }
        },
        close: () => {
          dispatchComponent('streamDrawer', { slug: false, active: false })
        },
      }
    }

    get draggableCard() {

      return {
        data: state.components.draggableCard.data,
        active: state.components.draggableCard.active,
        close: () => {
          this.sounds.click()
          dispatchComponent('draggableCard', { active: false })
        },
        open: (title, body) => {
          this.sounds.click()
          dispatchComponent('draggableCard', { active: false })
          setTimeout(() => dispatchComponent('draggableCard', {
            active: true,
            data: { title, body },
          }), 300)
        }
      };
    }

  }

  return cls
};

export default actions
