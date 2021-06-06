import { useEffect, useState } from 'react';
import Head from 'next/head';

import { listenLatestDeveets } from 'firebase/client';

import useUser from 'hooks/useUser';

import Deveet from 'components/Deveet';
import Header from 'components/Header';
import Navbar from 'components/Navbar';

import styles from 'styles/Home.module.css';

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (user) {
      const unsubscribe = listenLatestDeveets(newDeveets => setTimeline(newDeveets));
      return () => unsubscribe && unsubscribe();
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Home / devter</title>
        <meta name='description' content='homepage' />
      </Head>

      <Header>
        <h2>Home</h2>
      </Header>
      <section className={styles.deveets}>
        {timeline.map(deveet => (
          <Deveet deveet={deveet} key={deveet.id} />
        ))}
      </section>
      <Navbar />
    </>
  );
}
