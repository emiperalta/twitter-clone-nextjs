import { useState } from 'react';
import Head from 'next/head';

import useUser from 'hooks/useUser';

import Button from 'components/Button';
import Avatar from 'components/Avatar';

import styles from 'styles/ComposeDeveet.module.css';

export default function ComposeDeveet() {
  const [message, setMessage] = useState('');
  const user = useUser();

  const handleChange = e => setMessage(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <Head>
        <title>Home / devter</title>
        <meta name='description' content='composer/deveet' />
      </Head>
      <form onSubmit={handleSubmit}>
        <section className={styles.compose}>
          <Avatar />
          <textarea
            className={styles.compose__deveet}
            onChange={handleChange}
            placeholder='¿Qué está pasando?'
            value={message}
          ></textarea>
        </section>
        <div className={styles.compose__btn}>
          <Button disabled={message.length === 0}>Devitear</Button>
        </div>
      </form>
    </>
  );
}
