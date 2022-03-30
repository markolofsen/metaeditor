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
      // headers: { 'Content-Type': 'application/json' },
    }

    // body preparations
    if (method === 'POST' && params.body) {
      try { options.body = JSON.stringify(params.body) } catch (err) {
        console.error('Request', { method, err })
      }
    }

    try {
      const response = await fetch(url, options);
      const responseJson = await response.json();
      return {
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

  async GET(url) {
    return await this.request('GET', url);
  }

  async POST(url, body) {
    return await this.request('POST', url, { body });
  }

  async DELETE(url) {
    return await this.request('DELETE', url);
  }
}




export default Request
