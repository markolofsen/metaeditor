/*
Usage:

// hooks
import {useStorage} from 'hooks/'

const STORAGE_KEY = 'DEMO_KEY'

function Demo() {
  const storage = useStorage()
  const [data, setData] = React.useState<any>({name: ''})

  React.useEffect(() => {

    const stored_data = storage.getItem(STORAGE_KEY, 'local')
    if(typeof stored_data === 'object') {
      setData(stored_data)
    }

  }, [])

  const handleChange = (key) => (event) => {
    const value = event.target.value

    setData(c => {
      const newData = {...c, [key]: value}
      storage.setItem(STORAGE_KEY, newData, 'local')
      return newData;
    })
  }

  return (
    <TextField
      value={data.name}
      onChange={handleChange('name')}
      label="Name"
      type="text"
      fullWidth
    />
  );
};

*/




// type StorageType = 'session' | 'local';
// type UseStorageReturnValue = {
//   getItem: (key: string, type?: StorageType) => string;
//   setItem: (key: string, value: string, type?: StorageType) => boolean;
//   removeItem: (key: string, type?: StorageType) => void;
// };

// declarations
declare global {
  interface Window {
    [key: string]: any
  }
}


export const useStorage = () => {
  const storageType = (type?: string) => `${type ?? 'session'}Storage`;

  const isBrowser = typeof window !== 'undefined'

  const getItem = (key: string, type?: string) => {

    let value = window[storageType(type)][key]

    // If value is object
    try {
      value = JSON.parse(value)
    } catch (err) { }

    return isBrowser ? value : '';
  };

  const setItem = (key: string, value: any, type?: string) => {
    if (isBrowser) {

      // If value is object
      if (typeof value === 'object') {
        try {
          value = JSON.stringify(value)
        } catch (err) {
          console.error('Can\'t serialize data', err)
        }
      }

      window[storageType(type)].setItem(key, value);
      return true;
    }

    return false;
  };

  const removeItem = (key: string, type?: string) => {
    window[storageType(type)].removeItem(key);
  };

  const wrapper = (STORAGE_KEY: string) => {
    return {
      read: async (cb?: Function) => {
        const stored_data = await getItem(STORAGE_KEY)
        if (typeof cb === 'function') {
          cb(stored_data || null)
          return stored_data
        }
      },
      save: (data: string | JSON) => {
        setItem(STORAGE_KEY, data)
      },
      remove: () => {
        removeItem(STORAGE_KEY)
      }
    }
  }

  return {
    getItem,
    setItem,
    removeItem,
    wrapper,
  };
};

export default useStorage;
