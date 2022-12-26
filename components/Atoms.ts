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

export const isLoggedInState = atom({
  key: 'isLoggedIn',
  default: false,
});

interface IUserInfo {
  email: string;
}

export const userInfoState = atom<IUserInfo | null>({
  key: 'userInfo',
  default: null,
});
