// libs
import _ from 'lodash'

// layers
import layers from './layers'


// config
const APP_KEY = '__ps__' //'ps_app'
const CALLBACK_KEY = 'ps_callback'
const CALLBACK_DETAILS = 'ps_callback_details'



class CmdClass {
  constructor({ key, value }) {

    this.key = key
    this.value = value
    this.verification_id = null

    this.callback_delay_sec = 2 //Max delay to callback response
  }

  get callbacks_list() {
    return window[CALLBACK_DETAILS];
  }

  setVerificationId() {
    this.verification_id = _.uniqueId(this.key + ':');
  }

  window(cb) {
    if (typeof window === 'undefined') return;
    return cb(window[APP_KEY]);
  }

  emit(value) {

    this.setVerificationId()

    this.window(w => {
      const payload = {
        type: this.key,
        value,
        verification_id: this.verification_id,
      }
      // console.warn({payload});
      // console.error('@@w.emit', w.emit)
      w.emit(payload)
    })

  }

  get value_empty() {
    const object = _.entries(this.value).map(([key, value]) => {
      value = undefined
      return { key, value }
    }).reduce((map, { key, value }) => ({ ...map, [key]: value }), {});
    return object; Z
  }

  async test() {
    const value = this.value;
    // console.warn({value});
    this.emit(value)
    return await this.then(value)
  }

  // async reset() {
  //   const value = this.value_empty;
  //   // console.warn({value});
  //   return await this.then(value)
  // }

  async send(cb) {
    const value = cb(this.value_empty);

    this.emit(value)

    return await this.then(value)
  }

  async then(value) {

    // // Hack to make it faster (for debugging)
    // if(isDev) {
    //
    //   const newDetail = {
    //     caller: 'interface',
    //     type: this.key,
    //     verification_id: this.verification_id,
    //     time: null,
    //     payload: {
    //       value,
    //     },
    //     __str__: '',
    //   }
    //
    //   document.dispatchEvent(new CustomEvent(CALLBACK_KEY, { detail: newDetail }))
    // }

    const res = await new Promise((resolve, reject) => {

      let iterations = this.callback_delay_sec

      const check = () => {

        const found = _.find(this.callbacks_list, o => o.verification_id === this.verification_id)

        if (found) {
          // alert('Found!')
          clearInterval(this.callback_interval)
          iterations = 0
          resolve(found)
        }

        if (iterations <= 0) {
          clearInterval(this.callback_interval)
          resolve(false)
          // reject()
        }
      }

      check() // Start faster

      this.callback_interval = setInterval(() => {
        check()
        iterations -= 1
      }, 1000)

    });

    return res

  }

}


const Scheme = new class {

  // setListeners() {
  //
  //   if(typeof window === 'undefined') return ;
  //   if(typeof window[CALLBACK_DETAILS] === 'undefined') {
  //     window[CALLBACK_DETAILS] = []
  //   }
  //
  //   // document.removeEventListener(CALLBACK_KEY, this.listener, true)
  //   document.addEventListener(CALLBACK_KEY, ({detail}) => {
  //
  //     Message.error('CALLBACK RECEIVED', CALLBACK_KEY, detail);
  //
  //     window[CALLBACK_DETAILS].unshift({
  //       ...detail,
  //       __received_at: moment().format()
  //     })
  //     window[CALLBACK_DETAILS] = window[CALLBACK_DETAILS].slice(0, 100)
  //
  //     // Message.info('received callback:', detail);
  //   }, true)
  // }

  get commands() {

    let res = {}
    Object.entries(layers).map(([ns, layer]) => {
      layer.map(group => {
        Object.entries(group.commands).map(([key, obj]) => {

          res[key] = new CmdClass({
            key,
            value: obj.value,
          })

        })
      })
    })

    // console.warn(res);
    return res;
  }
}


export default Scheme
