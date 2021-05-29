import { useEffect, useState } from 'react';
import Head from 'next/head';

import useUser from 'hooks/useUser';

import Deveet from 'components/Deveet';

import styles from 'styles/Home.module.css';
import { getDeveets } from 'firebase/client';

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user && getDeveets().then(res => setTimeline(res));
  }, [user]);

  return (
    <>
      <Head>
        <title>Inicio / devter</title>
        <meta name='description' content='homepage' />
      </Head>

      <header className={styles.header}>
        <h2>Home</h2>
      </header>
      <section className={styles.deveets}>
        {timeline.map(deveet => (
          <Deveet deveet={deveet} key={deveet.id} />
        ))}
      </section>
      <nav className={styles.nav}></nav>
    </>
  );
}
