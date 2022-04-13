import React from 'react'

// context
import { usePlayer } from '../../../../context/';



export default function useCommands() {
  const player = usePlayer()

  const [verifiedCommands, setVerifiedCommands] = React.useState({})


  const cls = new class {
    async handleEmit(item) {

      // console.error('@@@@@item', item, index)

      // const generateRandomIntegerInRange = (min, max) => {
      //   return Math.floor(Math.random() * (max - min + 1)) + min;
      // }

      // const verification_id = item.id + generateRandomIntegerInRange(1000, 10000)

      const setStatus = (status) => {
        setVerifiedCommands(c => {
          c[item.id] = status
          return c
        })
      }

      setStatus('await')

      await player.cmd.emit({
        command: item.slug,
        verification_id: undefined, //item.id,
        initiator: item.is_fake && 'fake',
        request: {
          body: item.value
        },
        fakeBody: item.is_fake ? item.value_fake_response : undefined,
      }).then(res => {

        if (res) {
          setStatus('success')
          setTimeout(() => setStatus(undefined), 1000)
        } else {
          setStatus('error')
        }

      })

    }


    getCommandStatus(item) {

      let [value, icon] = [undefined, 'play_arrow']

      if (verifiedCommands.hasOwnProperty(item.id)) {
        value = verifiedCommands[item.id]
        if (value === 'await') {
          icon = 'hourglass_full'
        } else if (value === 'success') {
          icon = 'check'
        } else if (value === 'error') {
          icon = 'error'
        }
      }

      return { value, icon }
    }
  }

  return cls
}