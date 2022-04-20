import * as React from 'react';

// nextjs
import { useRouter } from 'next/router';

// libs
import url from 'url'


export default function useLogicConnect() {
  const router = useRouter()

  const [params, setParmas] = React.useState({
    autoConnect: false,
    isDevUrl: true,
    isLocalhost: true,
    showInterface: false,
  })

  React.useEffect(() => {

    if (router.isReady) {

      const parseUrl = (str) => url.parse(str, true, false)

      /**
       * Redirect to http if .../localhost=true or is dev domain
       */

      // const devUrl = parseUrl(process.env.DEV_URL)
      const devUrl = parseUrl(document.location.href)
      const currentUrl = parseUrl(document.location.href)

      const isDevUrl = currentUrl.hostname === devUrl.hostname
      const isLocalhost = currentUrl.query?.localhost == 'true' || ['127.0.0.1', 'localhost'].includes(currentUrl.hostname)

      // if (isDevUrl && currentUrl.protocol == 'https:') {
      //   const buildUrl = url.format({ ...currentUrl, protocol: 'http' })
      //   document.location.href = buildUrl
      // }

      const autoConnect = (isDevUrl || isLocalhost) ? false : true

      // Hide interface if...
      const showInterface = (router.query?.view?.toString() === '0' || isDevUrl) ? false : true

      setParmas({ autoConnect, isDevUrl, isLocalhost, showInterface })

    }

  }, [router.isReady])

  return { params }
}