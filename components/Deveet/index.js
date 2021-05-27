import Avatar from 'components/Avatar';

import styles from 'styles/Deveet.module.css';

export default function Deveet({ deveet }) {
  return (
    <article key={deveet.id} className={styles.deveet}>
      <div className={styles.avatar}>
        <Avatar alt={deveet.username} src={deveet.avatar} />
      </div>
      <section>
        <div className={styles.user}>
          <span>
            <strong>{deveet.name}</strong>
          </span>
          <span>@{deveet.username}</span>
        </div>
        <div className={styles.message}>
          <p>{deveet.message}</p>
        </div>
      </section>
    </article>
  );
}
