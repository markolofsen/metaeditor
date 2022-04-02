

const STREAM_API_URL = process.env.API_URL || `https://api.metaeditor.io`


const cls = new class {
  constructor() {

  }

  getStreamAccessUrl(buildId) {
    return `${STREAM_API_URL}/api/streams_provider/access/${buildId}/`
  }
}

export default cls