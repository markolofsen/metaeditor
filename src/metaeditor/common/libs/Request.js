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

import * as React from 'react';

const Request = new class {

  async request(method, url, params = {}) {

    let options = {
      method,
      mode: 'cors',

      headers: {
        'Origin': '',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': undefined,
        ...params?.headers,
      },
    }

    // body preparations
    if (method === 'POST' && params.body) {
      try { options.body = JSON.stringify(params.body) } catch (err) {
        console.error('Request', { method, err })
      }
    }

    // console.error('@@@options.headers', options.headers)

    options.headers = new Headers(options.headers)

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
        status: error.status,
        error,
      };
    }

  }

  async GET(url, { headers }) {
    return await this.request('GET', url, { headers });
  }

  async POST(url, body, { headers }) {
    return await this.request('POST', url, { body, headers });
  }

  async DELETE(url, { headers }) {
    return await this.request('DELETE', url, { headers });
  }
}




export default Request
