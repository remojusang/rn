import { atom } from 'recoil';
import personData from '../utils/personData';

export const localeState = atom({
  key: 'localeState',
  default: 'ko',
});

export const personDataState = atom({
  key: 'personData',
  default: personData,
});
