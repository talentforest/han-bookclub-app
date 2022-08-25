import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { IBookApi } from "data/bookAtom";
import { dbService } from "fbase";
import { extraUserData } from "routes/EditProfile";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

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

export const getBookMeetings = async (
  setState: (docData: IBookMeeting[]) => void
) => {
  const q = query(
    collection(dbService, "BookMeeting Info"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IBookMeeting;
    });

    setState(newArray);
  });
};

export const getSubjects = async (
  month: string,
  setSubjects: (doc: IWrittenDocs[]) => void
) => {
  const q = query(
    collection(dbService, `BookMeeting Info/${month}/subjects`),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IWrittenDocs;
    });
    setSubjects(newArray);
  });
};

export const getReviews = async (
  id: string,
  setReviews: (doc: IWrittenDocs[]) => void
) => {
  const q = query(
    collection(dbService, `BookMeeting Info/${id}/reviews`),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IWrittenDocs;
    });
    setReviews(newArray);
  });
};

export const getAllRecommends = async (
  id: string,
  setState: (doc: IWrittenDocs[]) => void
) => {
  const q = query(
    collection(dbService, `BookMeeting Info/${id}/recommended book`),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IWrittenDocs;
    });
    setState(newArray);
  });
};

export const getUserData = (
  uid: string,
  setExtraUserData: (doc: extraUserData) => void
) => {
  onSnapshot(doc(dbService, "User Data", `${uid}`), (doc) => {
    setExtraUserData(doc.data() as extraUserData);
  });
};

export const getFixedBookFields = async (
  setState: (fixedField: IFixedBookField[]) => void
) => {
  const q = query(
    collection(dbService, "bookfield"),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    setState(newArray as IFixedBookField[]);
  });
};

export const getVotes = async (setState: (voteDoc: IVote[]) => void) => {
  const q = query(collection(dbService, "Vote"), orderBy("createdAt", "desc"));

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IVote;
    });
    setState(newArray);
  });
};

export const getMembersVote = async (
  id: string,
  setState: (myVoteDoc: IVote[]) => void
) => {
  const q = query(
    collection(dbService, `Vote/${id}/Voted Items`),
    orderBy("createdAt", "desc")
  );

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as IVote;
    });

    setState(newArray);
  });
};

export const getUpdateRequestDoc = (
  setState: (request: UpdateRequestDoc[]) => void
) => {
  const q = query(
    collection(dbService, "Update Request"),
    orderBy("createdAt", "desc")
  );
  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as unknown as UpdateRequestDoc;
    });

    setState(newArray);
  });
};
