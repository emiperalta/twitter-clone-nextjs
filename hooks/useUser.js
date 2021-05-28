import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { onAuthStateChanged } from 'firebase/client';

export default function useUser() {
  const [user, setUser] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(user => setUser(user));
  }, []);

  useEffect(() => {
    user === null && router.push('/');
  }, [user]);

  return user;
}
