export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Sign: undefined;
  Detail: PersonType;
};

export type PersonType = {
  name: string;
  age: number;
  gender: 'male' | 'female';
};
