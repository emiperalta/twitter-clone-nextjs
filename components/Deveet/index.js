import Link from 'next/link';
import { useRouter } from 'next/router';

import Avatar from 'components/Avatar';

import useTimeAgo from 'hooks/useTimeAgo';

import styles from 'styles/Deveet.module.css';

export default function Deveet({ deveet }) {
  const router = useRouter();
  const timeago = useTimeAgo(deveet.createdAt);

  const handleClick = e => {
    e.preventDefault();
    router.push(`/status/${deveet.id}`);
  };

  return (
    <>
      <article key={deveet.id} className={styles.deveet} onClick={handleClick}>
        <div className={styles.avatar}>
          <Avatar alt={deveet.username} src={deveet.avatar} />
        </div>
        <section>
          <div className={styles.user}>
            <span>
              <strong>{deveet.username}</strong>
            </span>
            {/* <span>@{deveet.username}</span> */}
            <span>·</span>
            <Link href={`/status/${deveet.id}`}>
              <a className={styles.time}>
                <time>{timeago}</time>
              </a>
            </Link>
          </div>
          <div className={styles.content}>
            <p>{deveet.content}</p>
          </div>
          {deveet.img && <img src={deveet.img} className={styles.img} />}
        </section>
      </article>
    </>
  );
}
