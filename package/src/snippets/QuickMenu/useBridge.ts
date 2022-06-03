import * as React from 'react'

// context
import { useSystem, usePlayer } from '../../context/';


export default function useBridge() {
  const system = useSystem()
  const player = usePlayer()

  const cls = new class {

    async _emit(uuid: string) {
      return await player.cls.emitUuidAsync(uuid)
    }

    get menu() {

      const click = (uuid: string) => {
        if (uuid) {
          this._emit(uuid)
        }
      }

      const list = system.project.menu || []
      return list.map((item: any) => ({
        ...item,
        onClick: () => click(item.command_uuid),
        subitems: item.subitems.map((sub: any) => ({
          ...sub,
          onClick: async () => {
            click(item.command_uuid)
            await click(sub.command_uuid)
          },
        }))
      }))
    }

  }

  return cls

}

