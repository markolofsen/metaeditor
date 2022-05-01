import scheme from './scheme'

const Client = new class {

  get commands() {
    return scheme.commands
  }
}

export default Client
