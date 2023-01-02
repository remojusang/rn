import { atom } from 'recoil';
import personData from '../utils/personData';
import {
  getStorageData,
  setStorageData,
  removeStorageData,
} from '../utils/storage';

const asyncStorageEffect =
  (key: string) =>
  ({ setSelf, onSet, trigger }: any) => {
    // If there's a persisted value - set it on load
    const loadPersisted = async () => {
      const savedValue = await getStorageData(key);

      if (savedValue != null) {
        setSelf(savedValue);
      }
    };

    // Asynchronously set the persisted data
    if (trigger === 'get') {
      loadPersisted();
    }

    // Subscribe to state changes and persist them
    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? removeStorageData(key)
        : setStorageData(key, newValue);
    });
  };

export const localeState = atom({
  key: 'localeState',
  default: 'ko',
  effects: [asyncStorageEffect('locale')],
});

export const personDataState = atom({
  key: 'personData',
  default: personData,
});

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
  effects: [asyncStorageEffect('isLoggedIn')],
});

export const uidState = atom<string | null>({
  key: 'uid',
  default: null,
  effects: [asyncStorageEffect('uid')],
});
