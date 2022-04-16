import * as React from 'react';

// nextjs
import { useRouter } from 'next/router';

// libs
import url from 'url'


export default function useAutoConnect() {
  const router = useRouter()

  const [autoConnect, setAutoConnect] = React.useState(null)


  React.useEffect(() => {

    if (router.isReady) {

      const parseUrl = (str) => url.parse(str, true, false)

      /**
       * Redirect to http if .../localhost=true
       */
      const currentUrl = parseUrl(document.location.href)

      const isLocalhost = currentUrl.query?.localhost == 'true'
      if (currentUrl.protocol == 'https:' && isLocalhost) {
        const buildUrl = url.format({ ...currentUrl, protocol: 'http' })
        document.location.href = buildUrl

      } else {
        setAutoConnect(isLocalhost ? false : true)
      }

    }

  }, [router.isReady])

  return autoConnect
}