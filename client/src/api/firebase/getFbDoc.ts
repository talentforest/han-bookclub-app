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

import { USER, loadedStatus } from '@/appConstants';

import { LoadableStatus } from '@/types';

export function getDocument<T>(
  coll: string,
  docId: string,
  setState: (docState: LoadableStatus<T>) => void,
) {
  const listener = onSnapshot(doc(dbService, coll, docId), doc => {
    setState({
      ...loadedStatus,
      data: doc.exists() ? (doc.data() as T) : null,
    });
  });

  return listener;
}

export async function getSubCollectionGroup<T>(
  coll: string,
  setState: (arr: LoadableStatus<T[]>) => void,
  ...constraints: QueryConstraint[]
) {
  const q = query(collectionGroup(dbService, coll), ...constraints);

  const listener = onSnapshot(q, querySnapshot => {
    const newDataArray = querySnapshot.docs.map(doc => {
      return {
        docId: doc.id,
        yearMonthId: doc.ref.parent.parent.id,
        ...doc.data(),
      } as T;
    });

    setState({ ...loadedStatus, data: newDataArray });
  });

  return listener;
}

export function getCollection<T>(
  coll: string,
  setState: (arr: LoadableStatus<T[]>) => void,
  ...constraints: QueryConstraint[]
) {
  const collRef = collection(dbService, coll);

  const userConstraints = [where('name', '!=', '테스트계정')];

  const con = coll === USER ? userConstraints : [];

  const queryRef = query(collRef, ...con, ...constraints);

  const listener = onSnapshot(queryRef, querySnapshot => {
    const newArray = querySnapshot.docs.map(doc => {
      return { docId: doc.id, ...doc.data() } as T;
    });
    setState({ ...loadedStatus, data: newArray });
  });

  return listener;
}

export function unsubscribe(listener: () => void) {
  onAuthStateChanged(authService, user => {
    if (user == null) {
      listener();
    }
  });
}
