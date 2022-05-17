
import useStorage from './useStorage'

export const useStorageBook = () => {
  const storage = useStorage()

  const cls = new class {

    get apiKey() {
      return storage.wrapper('API_KEY')
    }

    get sessionUuid() {
      return storage.wrapper('SESSION_UUID')
    }

  }

  return cls
}