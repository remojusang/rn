type RegexType = {
  email: RegExp;
  password: RegExp;
  phone: RegExp;
  passwordCheck?: RegExp; // TS에러 방지
  name: RegExp;
  age: RegExp;
};

const REGEX: RegexType = {
  email: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  password: /^[a-zA-Z0-9]{8,16}$/,
  phone: /^\d{3}-\d{3,4}-\d{4}$/,
  name: /^[a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣]{1,12}$/,
  age: /^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^[1-9]{1}[0-2]{1}[0-9]{1}$/,
} as const;

type IndexStringObject = { [index: string]: string };

const FORM_ERR_MSG: IndexStringObject = {
  email: '올바른 이메일 패턴이 아닙니다.',
  password: '8~16자 영문 대소문자, 숫자를 사용하세요.',
  required: '해당란을 입력해주세요.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  phone: '올바른 휴대폰 패턴이 아닙니다.',
  name: '이름은 최대 12자까지 입력.',
  age: '나이는 1~129살까지 입력.',
} as const;

const ACCESS_HINT: IndexStringObject = {
  LOADER: 'loader',
  PW: 'password',
  PW_CHECK: 'passwordCheck',
  ADD_BTN: 'addBtn',
  FLOATING_BTN: 'floatingBtn',
} as const;

const COUNTRIES = ['한글', 'English', '日本語'];

const countryToLocale: IndexStringObject = {
  한글: 'ko',
  English: 'en-US',
  日本語: 'jp',
} as const;

const CAMERA_ERRCODE: IndexStringObject = {
  camera_unavailable: 'camera not available on device',
  permission: 'Permission not satisfied',
} as const;

const AUTH_MSG: IndexStringObject = {
  'auth/email-already-in-use': '이미 가입된 이메일입니다.',
  'auth/wrong-password': '잘못된 비밀번호입니다.',
  'auth/user-not-found': '존재하지 않는 계정입니다.',
  'auth/invalid-email': '유효하지 않은 이메일 주소입니다.',
};
export {
  REGEX,
  FORM_ERR_MSG,
  ACCESS_HINT,
  COUNTRIES,
  countryToLocale,
  CAMERA_ERRCODE,
  AUTH_MSG,
};
