import * as React from 'react'
import { useRouter } from 'next/router'

// components
import Player from 'src/components/Player'

export default function Page() {
  const router = useRouter()

  // states
  const [address, setAddress] = React.useState('ws://127.0.0.1:80')

  React.useEffect(() => {
    if (!router.isReady) return
    setAddress(router.query.ss as string)
  }, [router.isReady])

  if (!router.isReady) return null

  return (
    <div>
      <Player psHost={address} />
    </div>
  )
}