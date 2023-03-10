// package

interface Project {
  name: string
  version: string
  package: {
    name: string
    npmUrl: string
  }
  urls: {
    main: string
    docs: string
    support: string
    buy: string
    signalingServer: string
  }
  images: {
    background: string
  }
}

const pkgName = 'pixel-streaming'
const project: Project = {
  name: 'MetaEditor',
  version: '4',
  package: {
    name: pkgName,
    npmUrl: `https://www.npmjs.com/package/${pkgName}`,
  },
  urls: {
    main: 'http://metaeditor.io/',
    docs: 'https://metaeditor.io/docs',
    support: 'https://unrealos.com/p/contacts/',
    buy: 'https://unrealos.com/apps/metaeditor/',
    signalingServer: 'https://github.com/markolofsen/metaeditor/releases/tag/signaling-server',
  },
  images: {
    background: '/images/bg.jpg',
  }
}

export default project