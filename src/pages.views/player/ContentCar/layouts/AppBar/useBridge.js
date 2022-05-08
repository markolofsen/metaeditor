// context
import { useSystem } from 'metaeditor/context/'


export default function useBridge() {
  const system = useSystem()

  const cls = new class {

    async _emit(uuid) {
      return await system.clsApi.metaEmitAsync(uuid)
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

  }

  return cls

}

