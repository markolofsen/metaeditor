/**
 * Usage:
 * 
 Request.GET(url='https://...').then(res => {
  if(res.status === 200) {
    console.log(res.body)
  }
}).catch(err => {
  console.error(err)
})
 */

import * as React from 'react'

// config
import { config } from '../../assets/config'


export const Request = new class {

  urlBuilder(route: string) {
    return `${config.apiUrl}/api` + route
  }

  async request(method: string, url: string, getOptions: any = {}) {

    url = this.urlBuilder(url)

    let options = {
      method,
      mode: 'cors',
      ...getOptions,
    }

    options.headers = new Headers({
      ...options.headers,
      'Origin': '',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })

    // body preparations
    if (method === 'POST' && options.body) {
      try { options.body = JSON.stringify(options.body) } catch (err) {
        console.error('Request', { method, err })
      }
    }

    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();
      return {
        ok: response.status === 200,
        status: response.status,
        body: responseJson,
      }
    } catch (error) {
      console.error('Request', { error });
      return {
        status: 0,
        error,
      };
    }

  }

  async GET(url: string, options?: any) {
    return await this.request('GET', url, options);
  }

  async POST(url: string, body: any, options?: any) {
    return await this.request('POST', url, { body, ...options });
  }

  async DELETE(url: string, options?: any) {
    return await this.request('DELETE', url, options);
  }
}



