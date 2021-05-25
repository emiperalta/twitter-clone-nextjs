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

!firebase.app.length && firebase.initializeApp(firebaseConfig);

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then(user => {
      const { username, profile } = user.additionalUserInfo;
      const { avatar_url, blog } = profile;
      return {
        avatar: avatar_url,
        username,
        url: blog,
      };
    });
};
