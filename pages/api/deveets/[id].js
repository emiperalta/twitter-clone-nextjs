import { firestore } from 'firebase/admin';

export default (req, res) => {
  const { id } = req.query;
  firestore
    .collection('deveets')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data();
      const id = doc.id;
      if (typeof data === 'undefined') return res.status(404).end();
      res.json({
        ...data,
        id,
        createdAt: +data.createdAt.toDate(),
      });
    });
};
