const util = require('util');
const exec = util.promisify(require('child_process').exec);

// extra
const Replacer = require('./replacer')

// config
const REPO_URL = 'https://github.com/markolofsen/metaeditor'


const Deploy = new class {
  constructor() { }

  async deploy() {

    await exec('npx next build && npx next export -o ./build')
    await Replacer.production()
    await exec('npx gh-pages -d ./build')

    // Open urls
    await exec(`open https://metaeditor.io/docs/metaeditor/settings/deployment`)
    await exec(`open ${REPO_URL}/actions`)

    // setTimeout(async () => {
    //   await exec(`open ${REPO_URL}/settings/pages`)
    //   await exec(`open ${REPO_URL}/new/gh-pages`)
    //   await exec(`open ${REPO_URL}/new/gh-pages/_next`)
    // }, 1000 * 1)

  }
}


Deploy.deploy()
