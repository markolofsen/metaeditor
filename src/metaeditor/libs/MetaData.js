import * as React from 'react';

// libs
import { Request } from '../common/libs/'

// scripts
import compareVerions from './compareVerions'

// data
import packageJson from '../package.json'


const MetaData = new class {

    constructor() {
        this.upgradeReadmeUrl = 'https://metaeditor.io/docs/metaeditor/settings/upgrade'
        this.githubPackageUrl = 'https://raw.githubusercontent.com/markolofsen/metaeditor/main/package.json'
    }

    get version() {
        return 'v' + packageJson.version.slice(0, -2) + ' (beta)'
    }

    get demoMenu() {
        const list = [
            ['Documentation', 'https://metaeditor.io'],
            ['Community in Discord', 'https://discordapp.com/invite/eGHKuQ3BHM'],
            ['Github Issues', 'https://github.com/markolofsen/metaeditor/issues'],
            ['Careers', 'https://metaeditor.io/careers'],
            ['Contact Us', 'https://metaeditor.io/contacts'],
            ['License & Pricing', 'https://metaeditor.io/pricing'],
        ]
        return list
    }

    async checkUpdates() {

        return await Request.GET(this.githubPackageUrl).then(res => {

            if (res.status === 200) {
                // window.open(this.githubPackageUrl)

                const releaseVersion = res.body.dependencies['metaeditor']
                if (!releaseVersion || releaseVersion === 'latest') return

                const { current, release, status } = compareVerions(packageJson.version, releaseVersion)

                // alert(JSON.stringify({ release, current, status }, null, 4))

                return {
                    current,
                    release,
                    status,
                    readmeUrl: this.upgradeReadmeUrl,
                }

                // if (status < 0) {
                //     console.error('Need update', { status })
                // }
            }

            return false

        }).catch(err => {
            console.error(err)
        })
    }

}



export default MetaData