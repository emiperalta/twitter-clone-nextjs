import Link from 'next/link';

import HomeIcon from 'components/Icons/Home';
import SearchIcon from 'components/Icons/Search';
import CreateIcon from 'components/Icons/Create';

import styles from 'styles/Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href='/home'>
        <a>
          <HomeIcon width={32} height={32} />
        </a>
      </Link>
      <Link href='/home'>
        <a>
          <SearchIcon width={32} height={32} />
        </a>
      </Link>
      <Link href='/compose/deveet'>
        <a>
          <CreateIcon width={32} height={32} />
        </a>
      </Link>
    </nav>
  );
}
