import { firestore } from 'firebase/admin';

export default (req, res) => {
  return firestore
    .collection('deveets')
    .get()
    .then(({ docs }) => {
      const data = docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
          createdAt: +data.createdAt.toDate(),
        };
      });
      res.json(data);
    });
};
