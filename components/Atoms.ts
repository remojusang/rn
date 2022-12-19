import { atom } from 'recoil';

export const localeState = atom<'ko' | 'en-US' | 'jp'>({
  key: 'localeState',
  default: 'ko',
});
