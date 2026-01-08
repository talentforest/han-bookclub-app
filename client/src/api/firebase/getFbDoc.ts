import { authService, dbService } from '@/fbase';
import { onAuthStateChanged } from 'firebase/auth';
import {
  QueryConstraint,
  collection,
  collectionGroup,
  doc,
  onSnapshot,
  query,
} from 'firebase/firestore';

import { loadedStatus } from '@/appConstants';

import { LoadableStatus, SubCollectionSegment } from '@/types';

export function getDocument<T>(
  coll: string,
  docId: string,
  setState: (docState: LoadableStatus<T>) => void,
) {
  const docRef = doc(dbService, coll, docId);

  const listener = onSnapshot(docRef, doc => {
    setState({
      ...loadedStatus,
      data: doc.exists() ? (doc.data() as T) : null,
    });
  });

  return listener;
}

export async function getSubCollectionGroup<T>(
  subCollName: SubCollectionSegment,
  setState: (arr: LoadableStatus<T[]>) => void,
  ...constraints: QueryConstraint[]
) {
  const queryRef = query(
    collectionGroup(dbService, subCollName),
    ...constraints,
  );

  const listener = onSnapshot(queryRef, querySnapshot => {
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
  const queryRef = query(collRef, ...constraints);

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
