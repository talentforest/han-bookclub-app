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

  const unsubscribeSnapshot = onSnapshot(docRef, doc => {
    setState({
      ...loadedStatus,
      data: doc.exists() ? (doc.data() as T) : null,
    });
  });

  return () => {
    unsubscribeSnapshot();
    subscribeLogout(unsubscribeSnapshot);
  };
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

  const unsubscribeSnapshot = onSnapshot(queryRef, querySnapshot => {
    const newDataArray = querySnapshot.docs.map(doc => {
      return {
        docId: doc.id,
        yearMonthId: doc.ref.parent.parent.id,
        ...doc.data(),
      } as T;
    });

    setState({ ...loadedStatus, data: newDataArray });
  });

  return () => {
    unsubscribeSnapshot();
    subscribeLogout(unsubscribeSnapshot);
  };
}

export function getCollection<T>(
  coll: string,
  setState: (arr: LoadableStatus<T[]>) => void,
  ...constraints: QueryConstraint[]
) {
  const collRef = collection(dbService, coll);
  const queryRef = query(collRef, ...constraints);

  const unsubscribeSnapshot = onSnapshot(
    queryRef,
    querySnapshot => {
      const newArray = querySnapshot.docs.map(doc => {
        return { docId: doc.id, ...doc.data() } as T;
      });

      setState({ ...loadedStatus, data: newArray });
    },
    error => {
      console.warn(`[SUB ${coll}] onSnapshot ERROR`, {
        coll,
        code: (error as any).code,
        message: error.message,
      });
    },
  );

  return () => {
    unsubscribeSnapshot();
    subscribeLogout(unsubscribeSnapshot);
  };
}

export function subscribeLogout(listener: () => void) {
  const unsubAuth = onAuthStateChanged(authService, user => {
    if (user == null) listener();
  });

  return unsubAuth;
}
