import * as React from 'react'

// hooks
import { Request } from './useRequest'


export const useApi = () => {

  const cls = new class {
    constructor() { }


    sessionRead(sessionUuid: string) {
      return Request.GET('/streams_provider/session/read/' + sessionUuid)
    }

    sessionCreate(build_id: any) {
      return Request.POST('/streams_provider/session/create/', { build_id })
    }

    getMetaeditorData(apiKey?: string) {
      const headers = {
        'x-metaeditor-apikey': apiKey,
      }
      return Request.GET('/info/metaeditor/', { headers })
    }
  }

  return cls
}
