// libs
import parse from 'url-parse'


export const config = new class {
  systemName: string
  websiteUrl: string
  apiUrl: string
  portalUrl: string
  updateUrl: string

  constructor() {
    this.systemName = 'MetaEditor'
    this.websiteUrl = 'https://metaeditor.io'
    this.apiUrl = process.env.API_URL || 'https://api.metaeditor.io'
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