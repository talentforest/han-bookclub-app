import { DocumentType } from "components/bookmeeting/Subjects";
import { dbService } from "fbase";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { BookMeetingInfo } from "routes/BookMeeting";
import { extraUserData } from "routes/EditProfile";

export interface thisYearField {
  month: string;
  value: string;
}

export interface VoteItem {
  id: number;
  item: string;
  voteCount: number;
}

export interface Vote {
  title: string;

  voteItem: VoteItem[];
}

export interface VoteDocument {
  createdAt: number;
  creatorId: string;
  deadline: string;
  id: string;
  vote: Vote;
}

export interface UpdateRequestDoc {
  request: string;
  createdAt: Date;
  creatorId: string;
  type: string;
  id: string;
}

export const getBookMeetingInfoData = async (
  setState: (docData: BookMeetingInfo[]) => void
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
      } as BookMeetingInfo;
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

export const getThisYearBookField = async (
  setState: (thisYearField: thisYearField[]) => void
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
    setState(newArray as thisYearField[]);
  });
};

export const getVote = async (setState: (voteDoc: VoteDocument[]) => void) => {
  const q = query(collection(dbService, "Vote"), orderBy("createdAt", "desc"));

  onSnapshot(q, (querySnapshot) => {
    const newArray = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      } as VoteDocument;
    });
    setState(newArray);
  });
};

export const getMyVote = async (
  id: string,
  uid: string,
  setState: (myVoteDoc: VoteDocument[]) => void
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
      } as VoteDocument;
    });

    const myVote = newArray.filter((item) => item.id === uid);

    setState(myVote);
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
