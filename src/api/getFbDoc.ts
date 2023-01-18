import { authService, dbService } from 'fbase';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { USER_DATA } from '../util/index';

export function getDocument<T>(
  collectionName: string,
  documentId: string,
  setState: (doc: T) => void
) {
  const listener = onSnapshot(
    doc(dbService, collectionName, documentId),
    (doc) => {
      setState({ id: doc.id, ...doc.data() } as unknown as T);
    }
  );
  unsubscribe(listener);
}

export function getUserDocs<T>(
  collectionName: string,
  uid: string,
  setState: (doc: T) => void
) {
  const q = query(
    collection(dbService, `${collectionName}`),
    where('creatorId', '==', `${uid}`)
  );
  const listener = onSnapshot(q, (querySnapshot) => {
    const userDocs: any = [];
    querySnapshot.forEach((doc) => {
      userDocs.push(doc.data());
    });
    setState(userDocs);
  });

  unsubscribe(listener);
}

export function getCollection<T>(
  collectionName: string,
  setState: (arr: T[]) => void
) {
  const orderQ = query(
    collection(dbService, collectionName),
    orderBy('createdAt', 'desc')
  );
  const nonOrderQ = query(collection(dbService, collectionName));
  const q = collectionName === USER_DATA ? nonOrderQ : orderQ;

  const listener = onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as unknown as T;
    });
    setState(newArray);
  });

  unsubscribe(listener);
}

export function unsubscribe(listener: () => void) {
  onAuthStateChanged(authService, (user) => {
    if (user == null) {
      listener();
    }
  });
}
