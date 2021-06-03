const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

!admin.apps.length &&
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

export const firestore = admin.firestore();
