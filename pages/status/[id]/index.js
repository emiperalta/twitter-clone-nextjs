import Head from 'next/head';

import { firestore } from 'firebase/admin';

import Deveet from 'components/Deveet';

export default function DeveetPage({ deveet }) {
  return (
    <>
      <Head>
        <title>
          {deveet.username} en devter: {`"${deveet.content}"`}
        </title>
        <meta name='description' content={deveet.content} />
      </Head>
      <Deveet deveet={deveet} />
    </>
  );
}

export async function getStaticPaths() {
  /*const res = await fetch('http://localhost:3000/api/deveets');
  const deveets = await res.json();
  const paths = deveets.map(deveet => ({ params: { id: deveet.id } }));
  return { paths, fallback: false };*/
  return firestore
    .collection('deveets')
    .get()
    .then(({ docs }) => {
      const deveets = docs.map(doc => {
        const data = doc.data();
        const id = doc.id;
        return {
          ...data,
          id,
          createdAt: +data.createdAt.toDate(),
        };
      });
      const paths = deveets.map(deveet => ({ params: { id: deveet.id } }));
      return { paths, fallback: false };
    });
}

export async function getStaticProps(context) {
  const { id } = context.params;
  /*const res = await fetch(`http://localhost:3000/api/deveets/${id}`);
  if (res.ok) {
    const deveet = await res.json();
    return {
      props: { deveet },
    };
  }*/
  return firestore
    .collection('deveets')
    .doc(id)
    .get()
    .then(doc => {
      const data = doc.data();
      const id = doc.id;
      const deveet = {
        ...data,
        id,
        createdAt: +data.createdAt.toDate(),
      };
      return { props: { deveet } };
    });
}
