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
       * Redirect to http if .../localhost=true or is dev domain
       */

      const devUrl = parseUrl(process.env.DEV_URL)
      const currentUrl = parseUrl(document.location.href)
      // const currentUrl = parseUrl('https://ps-local.metaeditor.io/')

      const isDevUrl = currentUrl.hostname === devUrl.hostname
      const isLocalhost = currentUrl.query?.localhost == 'true'

      if (isDevUrl || isLocalhost) {
        if (currentUrl.protocol == 'https:') {
          const buildUrl = url.format({ ...currentUrl, protocol: 'http' })
          document.location.href = buildUrl
        } else {
          setAutoConnect(false)
        }
      } else {
        setAutoConnect(true)
      }

    }

  }, [router.isReady])

  return autoConnect
}