
// context
import { usePlayer } from 'metaeditor/context/'
import { useLayout } from './context/'


export default function useBridge() {
  const player = usePlayer()
  const layout = useLayout()

  const current = layout.state.current_event

  const cls = new class {

    async _e(type, value) {
      return await player.cls.emitAsync({ type, value })
    }

    // async _ep(type, payload) {
    //   return await player.cls.emitAsync({ type, ...payload })
    // }

    get amenities() {

      return {
        select: (slug) => this._e('select_amenity', { slug }),
        move_camera: (slug) => this._e('move_camera_to_amenity', { slug }),
        overview: (slug) => this._e('amenities_overview', { slug }),
        enter: (slug) => this._e('enter_amenity', { slug }),
        leave: () => {
          this._e('leave_amenity', {})
          layout.handleMenu('amenities')

          const slugs = ['ty1-gym', 'ty1-cinema', 'ty1-juicebar']

          this._e('filtered_amenities', { slugs: slugs.join(',') })
        },
        filtered: (slug) => this._e('filtered_amenities', { slugs: [slug].join(',') }),
      }

    }
    get surroundings() {

      return {
        // select: (slug) => this._e('select_amenity', { slug }),
        // move_camera: (slug) => this._e('move_camera_to_amenity', { slug }),
        // overview: (slug) => this._e('amenities_overview', { slug }),
        // enter: (slug) => this._e('enter_amenity', { slug }),
        // leave: () => {
        //   this._e('leave_amenity', {})
        //   layout.handleMenu('amenities')

        //   const slugs = ['ty1-gym', 'ty1-cinema', 'ty1-juicebar']

        //   this._e('filtered_amenities', { slugs: slugs.join(',') })
        // },
        // filtered: (slug) => this._e('filtered_amenities', { slugs: [slug].join(',') }),
      }

    }

  }

  return cls

}