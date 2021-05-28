import { useEffect, useState } from 'react';
import Head from 'next/head';

import useUser from 'hooks/useUser';

import Deveet from 'components/Deveet';

import styles from 'styles/Home.module.css';

export default function Home() {
  const [timeline, setTimeline] = useState([]);
  const user = useUser();

  useEffect(() => {
    user &&
      fetch('/api/statuses/home_timeline')
        .then(res => res.json())
        .then(data => setTimeline(data));
  }, [user]);

  return (
    <>
      <Head>
        <title>Home / devter</title>
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
