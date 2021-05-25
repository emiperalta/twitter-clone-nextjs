import { useState } from 'react';
import Head from 'next/head';

import Button from '../components/Button';
import { loginWithGitHub } from '../firebase/client';

import styles from '../styles/Home.module.css';

export default function Home() {
  const [user, setUser] = useState(null);

  const handleClick = () => {
    loginWithGitHub()
      .then(user => {
        setUser(user);
        console.log(user);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='Homepage' />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <section className={styles.section}>
            <h1 className={styles.title}>devter</h1>
            <h2 className={styles.subtitle}>
              Talk about development with developers
            </h2>
            <Button onClick={handleClick}>Login with GitHub</Button>
          </section>
        </main>
      </div>
    </div>
  );
}
