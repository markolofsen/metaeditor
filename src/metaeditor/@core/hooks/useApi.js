
// libs
import { Request } from '../../common/libs/'

const STREAM_API_URL = process.env.API_URL || `https://api.metaeditor.io`


export default function useApi() {

  const cls = new class {
    constructor() { }

    #urlBuilder(route) {
      return `${STREAM_API_URL}/api/` + route
    }

    async startSessionUuuid(sessionUuid) {
      const url = this.#urlBuilder('streams_provider/session/read/' + sessionUuid)

      return await Request.GET(url).then(res => {
        if (res.ok) {
          const { host, port, que, seconds_to_kill, seconds_to_start, status } = res.body.stream_data
          return { host, port, que, seconds_to_kill, seconds_to_start, status }
        }
      }).catch(err => {
        throw new Error(err);
      })
    }

    async getSessionUuid(build_id) {
      const url = this.#urlBuilder('streams_provider/session/create/')

      return await Request.POST(url, { build_id }).then(res => {
        if (res.ok) {
          return res.body.uuid
        }
        return false
      }).catch(err => {
        throw new Error(err);
      })
    }

    async getMetaeditorData() {
      const url = this.#urlBuilder('info/metaeditor/')

      return await Request.GET(url).then(res => {
        if (res.ok) {
          return res.body
        }
        return false
      }).catch(err => {
        throw new Error(err);
      })
    }

    sendFeedbackForm(body) {
      const url = this.#urlBuilder('customers/feedbacks/form/')
      return Request.POST(url, body)
    }
  }

  return cls
}
