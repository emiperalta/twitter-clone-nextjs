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

const mapUserFromFirebase = user => {
  const { displayName, email, photoURL } = user;
  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

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
