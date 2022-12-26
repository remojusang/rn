export type RootStackParamList = {
  Tabs: undefined;
  Home: undefined;
  Login: { signedEmail: string } | undefined;
  Sign: undefined;
  Detail: PersonType;
  Camera: undefined;
  Profile: undefined;
};

export type PersonType = {
  name: string;
  age: number;
  gender: 'male' | 'female';
};

export type AlbumImageType = {
  uri: string;
};
