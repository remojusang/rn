import { atom } from 'recoil';

export const localeState = atom<'ko' | 'en-US'>({
  key: 'localeState',
  default: 'ko',
});
