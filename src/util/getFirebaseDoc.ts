import { DocumentType } from "components/bookmeeting/Subjects";
import { BookDocument } from "data/bookAtom";
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
  book: BookDocument;
  createdAt: number;
  creatorId: string;
  meeting: IMeeting;
  id?: string;
}

export interface IMonthField {
  month: string;
  value: string;
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
}

export interface UpdateRequestDoc {
  request: string;
  createdAt: Date;
  creatorId: string;
  type: string;
  id: string;
}

export const getLatestBookMeeting = async (
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

export const getBookMeeting = async (
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
  setSubjects: (doc: DocumentType[]) => void
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
      } as unknown as DocumentType;
    });
    setSubjects(newArray);
  });
};

export const getReviews = async (
  id: string,
  setReviews: (doc: DocumentType[]) => void
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
      } as unknown as DocumentType;
    });
    setReviews(newArray);
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

export const getAllRecommends = async (
  id: string,
  setState: (doc: DocumentType[]) => void
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
      };
    });
    setState(newArray as DocumentType[]);
  });
};

export const getFixedBookFields = async (
  setState: (monthField: IMonthField[]) => void
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
    setState(newArray as IMonthField[]);
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
