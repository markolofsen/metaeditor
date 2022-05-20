// libs
import parse from 'url-parse'

// package.json
import { version } from '../../package.json'

console.log('>>>>>>>', process.env.NODE_ENV)

export const config = new class {
  isDev: boolean
  version: string
  systemName: string
  websiteUrl: string
  apiUrl: string
  portalUrl: string
  updateUrl: string

  constructor() {
    this.isDev = process.env.NODE_ENV === 'development'
    this.version = version
    this.systemName = 'MetaEditor'
    this.websiteUrl = 'https://metaeditor.io'
    this.apiUrl = this.isDev ? 'http://127.0.0.1:8000' : 'https://api.metaeditor.io'
    this.portalUrl = 'https://portal.metaeditor.io'
    this.updateUrl = 'https://metaeditor.io/docs/pixel-streaming/settings/update'
  }


  get portal() {
    const url_parsed: any = parse(this.portalUrl, true);
    return {
      name: url_parsed.hostname,
      url: this.portalUrl,
      urlProjects: this.portalUrl + '/user/projects/'
    }
  }

}