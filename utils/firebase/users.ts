import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

export interface IProfile {
  uid: string;
  displayName: string;
  photoURL: string;
}

function setProfile({ uid, displayName, photoURL }: IProfile) {
  return usersCollection.doc(uid).set({
    uid,
    displayName,
    photoURL,
  });
}

async function getProfile(uid: string) {
  const doc = await usersCollection.doc(uid).get();
  return doc.data();
}

export { usersCollection, setProfile, getProfile };
