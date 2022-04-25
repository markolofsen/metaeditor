/**
 * Usage
 * 
 * import {useParseUrl} from 'hooks/'
 * 
function Demo() {
  const parseUrl = useParseUrl()
  React.useEffect(() => {
      if (parseUrl.active && parseUrl.query?.mode === 'dev') {
        alert('Good!')
      }
    }, [parseUrl.active])
}
 */



import * as React from 'react';

// libs
import url from 'url'


function useParseUrl() {
  const [parsed, setParsed] = React.useState(false)

  const active = parsed !== false
  const query = active ? parsed.query : null

  React.useEffect(() => {

    const parsed = url.parse(document.location.href, true, false)
    setParsed(parsed)

  }, [])

  const cls = new class {
    constructor() {

    }

    changeLocation() {
      if (!active) {
        console.error('Url not parsed yet')
        return
      }

      const buildUrl = url.format({
        protocol: parsed.protocol,
        hostname: parsed.hostname,
        pathname: parsed.pathname,
        port: parsed.port,
        query: {
          ...query,
        }
      })

      document.location.href = buildUrl
    }
  }


  return {
    active,
    query,
  }
}


export default useParseUrl