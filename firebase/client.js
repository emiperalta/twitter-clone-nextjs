import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyC2KIc2GJ7WlbhbCCuXKGcF8UAlb6n6S9k',
  authDomain: 'devter-twitter-clone-23b22.firebaseapp.com',
  projectId: 'devter-twitter-clone-23b22',
  storageBucket: 'devter-twitter-clone-23b22.appspot.com',
  messagingSenderId: '1035024938505',
  appId: '1:1035024938505:web:fffe57fef3f2f8c00dead8',
  measurementId: 'G-MRBZCSN2TS',
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebase = user => {
  const { displayName, email, photoURL, uid } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

// auth
export const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

// db operations
export const addDeveet = ({ avatar, content, img, userId, username }) => {
  return db.collection('deveets').add({
    avatar,
    content,
    img,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.now(),
    likesCount: 0,
    sharedCount: 0,
  });
};

const mapDeveetFromFirebaseToDeveetObject = doc => {
  const data = doc.data();
  const id = doc.id;
  return {
    ...data,
    id,
    createdAt: +data.createdAt.toDate(),
  };
};

export const listenLatestDeveets = callback => {
  return db
    .collection('deveets')
    .orderBy('createdAt', 'desc')
    .limit(20)
    .onSnapshot(({ docs }) => {
      const latestDeveets = docs.map(doc =>
        mapDeveetFromFirebaseToDeveetObject(doc)
      );
      callback(latestDeveets);
    });
};

export const getDeveets = () => {
  return db
    .collection('deveets')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => docs.map(doc => mapDeveetFromFirebaseToDeveetObject(doc)));
};

export const uploadImage = file => {
  const ref = firebase.storage().ref(`images/${file.name}`);
  return ref.put(file);
};
