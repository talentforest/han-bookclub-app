import { authService, dbService } from 'fbase';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { USER_DATA } from 'constants/index';

export function getDocument<T>(
  coll: string,
  docId: string,
  setState: (doc: T) => void
) {
  const listener = onSnapshot(doc(dbService, coll, docId), (doc) => {
    setState({ id: doc.id, ...doc.data() } as unknown as T);
  });
  unsubscribe(listener);
}

export function getCollection<T>(coll: string, setState: (arr: T[]) => void) {
  const orderQ = query(
    collection(dbService, coll),
    orderBy('createdAt', 'desc')
  );
  const nonOrderQ = query(collection(dbService, coll));
  const q = coll === USER_DATA ? nonOrderQ : orderQ;

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
