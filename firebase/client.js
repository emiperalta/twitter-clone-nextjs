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
const onAuthStateChanged = onChange => {
  return firebase.auth().onAuthStateChanged(user => {
    const normalizedUser = user ? mapUserFromFirebase(user) : null;
    onChange(normalizedUser);
  });
};

const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(githubProvider);
};

// db operations
const addDeveet = ({ avatar, content, userId, username }) => {
  return db.collection('deveets').add({
    avatar,
    content,
    userId,
    username,
    createdAt: firebase.firestore.Timestamp.now(),
    likesCount: 0,
    sharedCount: 0,
  });
};

const getDeveets = () => {
  return db
    .collection('deveets')
    .get()
    .then(({ docs }) =>
      docs.map(doc => {
        const data = doc.data();
        const id = doc.id;

        return {
          ...data,
          id,
          createdAt: data.createdAt.toDate().toLocaleDateString(),
        };
      })
    );
};

export { addDeveet, getDeveets, loginWithGitHub, onAuthStateChanged };
