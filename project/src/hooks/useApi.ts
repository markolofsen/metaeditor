
// hooks
import { Request } from 'pixel-streaming'

export const useApi = () => {

  const cls = new class {
    constructor() { }

    sendRequest(body: any) {
      return Request.POST('/customers/metaeditor_request/form/', body)
    }

    getDemosList() {
      return Request.GET('/cabinet/builds_demos/list/')
    }

  }

  return cls
}
