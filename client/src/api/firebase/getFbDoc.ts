import { authService, dbService } from '@/fbase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  QueryConstraint,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

import { USER } from '@/appConstants';

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

export async function getSubCollectionGroup<T>(
  coll: string,
  setState: (arr: T[]) => void,
  ...constraints: QueryConstraint[]
) {
  const q = query(collectionGroup(dbService, coll), ...constraints);

  const listener = onSnapshot(q, querySnapshot => {
    const newArray = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        yearMonthId: doc.ref.parent.parent.id,
        ...doc.data(),
      } as unknown as T;
    });
    setState(newArray);
  });

  unsubscribe(listener);
}

export function getCollection<T>(
  coll: string,
  setState: (arr: T[]) => void,
  ...constraints: QueryConstraint[]
) {
  const collRef = collection(dbService, coll);

  const userConstraints = [where('name', '!=', '테스트계정')];

  const con = coll === USER ? userConstraints : [];

  const queryRef = query(collRef, ...con, ...constraints);

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
