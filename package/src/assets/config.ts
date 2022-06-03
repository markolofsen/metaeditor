import * as React from 'react'

// libs
import parse from 'url-parse'

// package.json
import packageJson from '../../package.json'


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
    this.version = packageJson.version
    this.systemName = 'MetaEditor'
    this.websiteUrl = 'https://metaeditor.io'

    this.apiUrl = 'https://api.metaeditor.io'
    if (this.isDev) {
      // this.apiUrl = 'http://127.0.0.1:8000'
    }

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