
// config
import { env } from 'config/'

// context
import { useSystem } from 'metaeditor/context/'


export default function useBridge() {
  const system = useSystem()

  const cls = new class {

    async _emit(uuid) {
      return await system.clsApi.metaEmitAsync(uuid)
    }

    // _convert(obj, ns) {
    //   return obj.map(([value, label], index) => {
    //     let item = {
    //       label,
    //       value,
    //       onClick: () => this._emit(value),
    //       src: false,
    //     }

    //     if (ns) {
    //       item.src = env.staticPath('tmp', 'configurator', `${ns}_${index + 1}.jpg`)
    //     }

    //     return item
    //   })
    // }

    // get leather() {
    //   return this._convert(commandsObj.leather, 'leather')
    // }

    // get paint() {
    //   return this._convert(commandsObj.paint, 'paint')
    // }

    // get seats() {
    //   return this._convert(commandsObj.seats, 'seats')
    // }

    // get trim() {
    //   return this._convert(commandsObj.trim, 'trim')
    // }

    // get wheels() {
    //   return this._convert(commandsObj.wheels, 'wheels')
    // }

    // get views() {
    //   return this._convert(commandsObj.views, false)
    // }

    async resetView() {
      this._emit(views.default)
    }

    get name() {
      return system.state.metaeditor?.project?.info?.name || ''
    }

    get menu() {

      const click = (uuid) => {
        if (!uuid) return undefined
        this._emit(uuid)
      }

      const list = system.state.metaeditor?.menu || []
      return list.map((item) => ({
        ...item,
        onClick: () => click(item.command_uuid),
        subitems: item.subitems.map((sub) => ({
          ...sub,
          onClick: () => click(sub.command_uuid),
        }))
      }))
    }

    // get menu() {
    //   return [
    //     {
    //       label: 'Views',
    //       slug: 'views',
    //       items: this.views,
    //     },
    //     {
    //       label: 'Paint',
    //       slug: 'paint',
    //       items: this.paint,
    //     },
    //     {
    //       label: 'Wheels',
    //       slug: 'wheels',
    //       items: this.wheels,
    //     },
    //     {
    //       label: 'Trim',
    //       slug: 'trim',
    //       items: this.trim,
    //     },
    //     {
    //       label: 'Leather',
    //       slug: 'leather',
    //       items: this.leather,
    //     },
    //     {
    //       label: 'Seats',
    //       slug: 'seats',
    //       items: this.seats,
    //     },
    //   ].map(item => ({
    //     ...item,
    //     onClick: () => this._emit(views[item.slug]),
    //   }))
    // }
  }

  return cls

}


// const views = {
//   default: '906da0',
//   paint: '906da0',
//   wheels: 'c13e27',
//   trim: '02ce76',
//   leather: '36a9c8',
//   seats: '36a9c8',
//   side_view: 'e85ec4',
//   front_view: 'd94e43',
//   back_view: '0a0b07',
//   passenger: '32bf92',
// }


// export const commandsObj = {
//   leather: [
//     ['2cd6dd', 'Variant 1'],
//     ['3a34ba', 'Variant 2'],
//     ['10d2ca', 'Variant 3'],
//     ['3186eb', 'Variant 4'],
//   ],
//   paint: [
//     ['b7c038', 'Red'],
//     ['7224e7', 'Black'],
//     ['b355d3', 'White'],
//     ['a634c0', 'Metalic'],
//     ['327558', 'Blue'],
//   ],
//   seats: [
//     ['5978aa', 'Variant 1'],
//     ['295ab6', 'Variant 2'],
//   ],
//   trim: [
//     ['afde35', 'Variant 1'],
//     ['335d15', 'Variant 2'],
//     ['28879b', 'Variant 3'],
//   ],
//   wheels: [
//     ['3810e3', 'Variant 1'],
//     ['273f58', 'Variant 2'],
//     ['cd0f34', 'Variant 3'],
//   ],

//   views: [
//     [views.side_view, 'Side view'],
//     [views.front_view, 'Front view'],
//     [views.back_view, 'Back view'],
//     [views.wheels, 'Wheels'],
//     [views.trim, 'Trim'],
//     [views.passenger, 'Passenger'],
//     [views.seats, 'Seats'],
//   ]
// }