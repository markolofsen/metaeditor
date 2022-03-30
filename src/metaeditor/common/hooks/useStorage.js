/*
Usage:

// hooks
import {useStorage} from 'hooks/'

const STORAGE_KEY = 'DEMO_KEY'

function Demo() {
  const storage = useStorage()
  const [data, setData] = React.useState({name: ''})

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

import * as React from 'react';

const useStorage = () => {
  const storageType = (type) => `${type ?? 'session'}Storage`;

  const isBrowser = typeof window !== 'undefined'

  const getItem = (key, type) => {

    let value = window[storageType(type)][key]

    // If value is object
    try {
      value = JSON.parse(value)
    } catch (err) { }

    return isBrowser ? value : '';
  };

  const setItem = (key, value, type) => {
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

  const removeItem = (key, type) => {
    window[storageType(type)].removeItem(key);
  };

  return {
    getItem,
    setItem,
    removeItem,
  };
};

export default useStorage;
