import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { addDeveet, uploadImage } from 'firebase/client';

import useUser from 'hooks/useUser';

import Button from 'components/Button';
import CloseIcon from 'components/Icons/Close';

import styles from 'styles/ComposeDeveet.module.css';

export default function ComposeDeveet() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [drag, setDrag] = useState(0);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (task) {
      const onProgess = () => {};
      const onError = () => {};
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(imgUrl => setImgURL(imgUrl));
        console.log(imgURL);
      };
      task.on('state_changed', onProgess, onError, onComplete);
    }
  }, [task]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    addDeveet({
      avatar: user.avatar,
      content: message,
      username: user.username,
      userId: user.uid,
      img: imgURL,
    })
      .then(() => {
        setMessage('');
        setIsLoading(false);
        router.push('/home');
      })
      .catch(error => console.error(error));
  };

  const handleChange = e => setMessage(e.target.value);

  const handleDragEnter = e => {
    e.preventDefault();
    setDrag(1);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    setDrag(0);
  };

  const handleDrop = e => {
    e.preventDefault();
    setDrag(0);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled = (!message.length && !imgURL) || isLoading;

  return (
    <>
      <Head>
        <title>Inicio / devter</title>
        <meta name='description' content='composer/deveet' />
      </Head>
      <form onSubmit={handleSubmit}>
        <section className={styles.compose}>
          <textarea
            className={styles.compose__deveet}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onChange={handleChange}
            placeholder='¿Qué está pasando?'
            value={message}
          ></textarea>
          {imgURL && (
            <section className={styles.compose__img}>
              <button onClick={() => setImgURL(null)}>
                <CloseIcon strokeWidth={2} />
              </button>
              <img src={imgURL} />
            </section>
          )}
        </section>
        <div className={styles.compose__btn}>
          <Button disabled={isButtonDisabled}>Devitear</Button>
        </div>
      </form>
      <style jsx>{`
        textarea {
          border: ${drag == 1 ? '2px dashed #09f' : '2px solid transparent'};
        }
      `}</style>
    </>
  );
}
