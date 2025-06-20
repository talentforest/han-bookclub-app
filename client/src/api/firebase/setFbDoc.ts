import { dbService } from '@/fbase';
import {
  DocumentData,
  WithFieldValue,
  collection,
  doc,
  setDoc,
} from 'firebase/firestore';

export async function setDocument(
  path: string,
  docId: string,
  docData: WithFieldValue<DocumentData>,
) {
  const docRef = doc(dbService, path, docId);
  await setDoc(docRef, docData);
}

export async function setCollection(
  path: string,
  docData: WithFieldValue<DocumentData>,
) {
  const docRef = doc(collection(dbService, path));
  await setDoc(docRef, docData);
}
