import { useEffect, useState } from 'react';
import Head from 'next/head';

import { loginWithGitHub, onAuthStateChanged } from 'firebase/client';

import Button from 'components/Button';
import Avatar from 'components/Avatar';

import styles from 'styles/Login.module.css';

export default function Login() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(user => setUser(user));
  }, []);

  const handleClick = () => {
    loginWithGitHub()
      .then(user => setUser(user))
      .catch(err => console.error(err));
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name='description' content='Homepage' />
      </Head>
      <section className={styles.section}>
        <h1 className={styles.title}>devter</h1>
        <h2 className={styles.subtitle}>Talk about development with developers</h2>
        {user === null && <Button onClick={handleClick}>Login with GitHub</Button>}
        {user && user.avatar && (
          <div>
            <Avatar alt={user.username} src={user.avatar} text={user.username} />
          </div>
        )}
      </section>
    </>
  );
}
