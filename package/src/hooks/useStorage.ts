// type StorageType = 'session' | 'local';
// type UseStorageReturnValue = {
//   getItem: (key: string, type?: StorageType) => string;
//   setItem: (key: string, value: string, type?: StorageType) => boolean;
//   removeItem: (key: string, type?: StorageType) => void;
// };

import * as React from 'react'

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

  const wrapper = (STORAGE_KEY: string, type?: string) => {
    return {
      read: async (cb?: Function) => {
        const stored_data = await getItem(STORAGE_KEY, type)
        if (typeof cb === 'function') {
          cb(stored_data || null)
          return stored_data
        }
      },
      save: (data: string | JSON) => {
        setItem(STORAGE_KEY, data, type)
      },
      remove: () => {
        removeItem(STORAGE_KEY, type)
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
