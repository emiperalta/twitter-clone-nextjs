import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { addDeveet } from 'firebase/client';

import useUser from 'hooks/useUser';

import Button from 'components/Button';
import Avatar from 'components/Avatar';

import styles from 'styles/ComposeDeveet.module.css';

export default function ComposeDeveet() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const user = useUser();

  const handleChange = e => setMessage(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    addDeveet({
      avatar: user.avatar,
      content: message,
      username: user.username,
      userId: user.uid,
    })
      .then(() => {
        setMessage('');
        setIsLoading(false);
        router.push('/home');
      })
      .catch(error => console.error(error));
  };

  const isButtonDisabled = !message.length || isLoading;

  return (
    <>
      <Head>
        <title>Inicio / devter</title>
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
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
    </>
  );
}
