import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { getDeveets } from 'firebase/client';

import useUser from 'hooks/useUser';

import CreateIcon from 'components/Icons/Create';
import Deveet from 'components/Deveet';
import HomeIcon from 'components/Icons/Home';
import SearchIcon from 'components/Icons/Search';

import styles from 'styles/Home.module.css';

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
      <nav className={styles.nav}>
        <Link href='/home'>
          <a>
            <HomeIcon width={32} height={32} />
          </a>
        </Link>
        <Link href='/explore'>
          <a>
            <SearchIcon width={32} height={32} />
          </a>
        </Link>
        <Link href='/compose/deveet'>
          <a>
            <CreateIcon width={32} height={32} />
          </a>
        </Link>
      </nav>
    </>
  );
}
