import { authService, dbService } from '@/fbase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';

import { CHALLENGE, USER } from '@/appConstants';

import { thisYear } from '@/utils';

export function getDocument<T>(
  coll: string,
  docId: string,
  setState: (docState: T) => void,
) {
  const listener = onSnapshot(doc(dbService, coll, docId), doc => {
    setState({ id: doc.id, ...doc.data() } as unknown as T);
  });
  unsubscribe(listener);
}

export function getCollection<T>(coll: string, setState: (arr: T[]) => void) {
  const collRef = collection(dbService, coll);
  const userQuery = query(collRef); // where('name', '!=', '테스트계정')
  const challengeQuery = query(
    collRef,
    where('__name__', '>=', `${thisYear}-`),
  );

  const orderQuery = query(collRef, orderBy('createdAt', 'desc'));

  const queryRef =
    coll === USER
      ? userQuery
      : coll === CHALLENGE
        ? challengeQuery
        : orderQuery;

  const listener = onSnapshot(queryRef, querySnapshot => {
    const newArray = querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as unknown as T;
    });
    setState(newArray);
  });

  unsubscribe(listener);
}

export function unsubscribe(listener: () => void) {
  onAuthStateChanged(authService, user => {
    if (user == null) {
      listener();
    }
  });
}
