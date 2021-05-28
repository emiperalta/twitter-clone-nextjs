import styles from 'styles/Button.module.css';

export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={styles.btn}>
        {children}
      </button>
    </>
  );
}
