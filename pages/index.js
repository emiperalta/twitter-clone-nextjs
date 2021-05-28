import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import useUser from 'hooks/useUser';

import { loginWithGitHub } from 'firebase/client';

import Button from 'components/Button';
import Spinner from 'components/Spinner';

import styles from 'styles/Login.module.css';

export default function Login() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleClick = () => {
    loginWithGitHub().catch(err => console.error(err));
  };

  return (
    <>
      <Head>
        <title>devter</title>
        <meta name='description' content='login' />
      </Head>
      <section className={styles.section}>
        <h1 className={styles.title}>devter</h1>
        <h2 className={styles.subtitle}>Talk about development with developers</h2>
        {user === null && <Button onClick={handleClick}>Login with GitHub</Button>}
        {user === undefined && <Spinner />}
      </section>
    </>
  );
}
