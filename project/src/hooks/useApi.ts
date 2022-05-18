
// hooks
import { Request } from 'pixel-streaming'


export const useApi = () => {

  const cls = new class {
    constructor() { }

    sendCustomerForm(body: any) {
      return Request.POST('/customers/feedbacks/form/', body)
    }

    getDemosList() {
      return Request.GET('/cabinet/builds_demos/list/')
    }

  }

  return cls
}
