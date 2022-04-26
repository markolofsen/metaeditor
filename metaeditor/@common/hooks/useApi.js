
// libs
import { Request } from 'metalib/common/libs/'

const STREAM_API_URL = process.env.API_URL || `https://api.metaeditor.io`


export default function useApi() {

  const cls = new class {
    constructor() { }

    urlBuilder(route) {
      return `${STREAM_API_URL}/api/` + route
    }

    async sessionRead(sessionUuid) {
      const url = this.urlBuilder('streams_provider/session/read/' + sessionUuid)
      return await Request.GET(url)
    }

    async sessionCreate(build_id) {
      const url = this.urlBuilder('streams_provider/session/create/')
      return await Request.POST(url, { build_id })
    }

    async getMetaeditorData(apiKey) {
      const url = this.urlBuilder('info/metaeditor/')
      const headers = {
        'x-metaeditor-apikey': apiKey,
      }
      return await Request.GET(url, { headers })
    }

    sendFeedbackForm(body) {
      const url = this.urlBuilder('customers/feedbacks/form/')
      return Request.POST(url, body)
    }

    getCommandsList() {
      const url = this.urlBuilder('projects/metaeditor/commands/list/')
      return Request.GET(url)
    }

    getDemosList() {
      const url = this.urlBuilder('cabinet/builds_demos/list/')
      return Request.GET(url)
    }
  }

  return cls
}
