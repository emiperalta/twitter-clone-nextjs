import Avatar from 'components/Avatar';

import useTimeAgo from 'hooks/useTimeAgo';

import styles from 'styles/Deveet.module.css';

export default function Deveet({ deveet }) {
  const timeago = useTimeAgo(deveet.createdAt);

  return (
    <article key={deveet.id} className={styles.deveet}>
      <div className={styles.avatar}>
        <Avatar alt={deveet.username} src={deveet.avatar} />
      </div>
      <section>
        <div className={styles.user}>
          <span>
            <strong>{deveet.username}</strong>
          </span>
          <span> · </span>
          <span>{timeago}</span>
          {/* <span>@{deveet.username}</span> */}
        </div>
        <div className={styles.content}>
          <p>{deveet.content}</p>
        </div>
        {deveet.img && <img src={deveet.img} className={styles.img} />}
      </section>
    </article>
  );
}
