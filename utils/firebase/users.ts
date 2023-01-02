import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('users');

interface ISetUser {
  id: string;
  displayName: string;
  photoURL: string;
}

function setUser({ id, displayName, photoURL }: ISetUser) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

async function getUser(id: string) {
  const doc = await usersCollection.doc(id).get();
  return doc.data();
}

export { usersCollection, setUser, getUser };
