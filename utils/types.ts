export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  Login: undefined;
  Sign: undefined;
  Detail: PersonType;
  Camera: undefined;
};

export type PersonType = {
  name: string;
  age: number;
  gender: 'male' | 'female';
};

export type AlbumImageType = {
  uri: string;
};
