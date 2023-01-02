import auth from '@react-native-firebase/auth';

interface ISign {
  email: string;
  password: string;
}

function signIn({ email, password }: ISign) {
  return auth().signInWithEmailAndPassword(email, password);
}

function signUp({ email, password }: ISign) {
  return auth().createUserWithEmailAndPassword(email, password);
}

function subscribeAuth(callback: any) {
  return auth().onAuthStateChanged(callback);
}

function signOut() {
  return auth().signOut();
}

export { signIn, signUp, subscribeAuth, signOut };
