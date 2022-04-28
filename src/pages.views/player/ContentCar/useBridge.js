
// context
import { useSystem } from 'metaeditor/context/'


export default function useBridge() {
  const system = useSystem()

  const cls = new class {

    async _emit(uuid) {
      return await system.clsApi.metaEmitAsync(uuid)
    }

    _convert(obj) {
      let res = {}
      Object.entries(obj).map(([key, uuid]) => {
        res[key] = {
          uuid,
          onClick: async () => {
            console.error('@@@call', uuid)
            return await this._emit(uuid)
          }
        }
      })
      return res
    }

    get leather() {
      return this._convert(commandsObj.leather)
    }

    get paint() {
      return this._convert(commandsObj.paint)
    }

    get seats() {
      return this._convert(commandsObj.seats)
    }

    get trim() {
      return this._convert(commandsObj.trim)
    }

    get wheels() {
      return this._convert(commandsObj.wheels)
    }

    get views() {
      return this._convert(commandsObj.views)
    }
  }

  return cls

}



export const commandsObj = {
  leather: {
    _0: '2cd6dd',
    _1: '3a34ba',
    _2: '10d2ca',
    _3: '3186eb',
  },
  paint: {
    red: 'b7c038',
    black: '7224e7',
    white: 'b355d3',
    metalic: 'a634c0',
    blue: '327558',
  },
  seats: {
    _0: '5978aa',
    _1: '295ab6',
  },
  trim: {
    _0: 'afde35',
    _1: '335d15',
    _2: '28879b',
  },
  wheels: {
    _0: '3810e3',
    _1: '273f58',
    _2: 'cd0f34',
  },
  views: {
    default: '906da0',
    paint: '906da0',
    wheels: 'c13e27',
    trim: '02ce76',
    leather: '36a9c8',
    seats: '36a9c8',

    side_view: 'e85ec4',
    front_view: 'd94e43',
    back_view: '0a0b07',
    passenger: '32bf92',
  }
}