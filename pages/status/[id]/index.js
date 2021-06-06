import Head from 'next/head';

import { firestore } from 'firebase/admin';

import Deveet from 'components/Deveet';
import Header from 'components/Header';
import Navbar from 'components/Navbar';

export default function DeveetPage({ deveet }) {
  return (
    <>
      <Head>
        <title>
          {deveet.username} on devter: {`"${deveet.content}"`}
        </title>
        <meta name='description' content={deveet.content} />
      </Head>
      <Header>
        <h2>Tweet</h2>
      </Header>
      <div>
        <Deveet deveet={deveet} />
      </div>
      <Navbar />
      <style jsx>{`
        div {
          flex: 1;
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
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
