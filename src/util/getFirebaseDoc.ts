import { IBookApi } from "data/bookAtom";
import { authService, dbService } from "fbase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export interface IMeeting {
  time: string;
  place: string;
}

export interface IBookMeeting {
  book: IBookApi;
  createdAt: number;
  creatorId: string;
  meeting: IMeeting;
  id?: string;
}

export interface IMonthField {
  month: string;
  value: string;
}

export interface IFixedBookField {
  thisYearField: IMonthField[];
  createdAt: number;
}

export interface IVoteItem {
  id: number;
  item: string;
  voteCount: number;
  selectReason: string;
}

export interface IVoteDocument {
  title: string;
  voteItem: IVoteItem[];
}

export interface IVote {
  vote: IVoteDocument;
  createdAt: number;
  creatorId: string;
  deadline: string;
  id: string;
  voteId: number;
}

export interface UpdateRequestDoc {
  request: string;
  createdAt: Date;
  creatorId: string;
  type: string;
  id: string;
}

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

export function getCollection<T>(
  collectionName: string,
  setState: (arr: T[]) => void
) {
  const q = query(
    collection(dbService, collectionName),
    orderBy("createdAt", "desc")
  );

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

function unsubscribe(listener: () => void) {
  onAuthStateChanged(authService, (user) => {
    if (user == null) {
      listener();
    }
  });
}
