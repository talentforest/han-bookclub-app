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