import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { atom } from "recoil";
import { IBookMeeting, IFixedBookField, IVote } from "util/getFirebaseDoc";
import { v4 } from "uuid";

export const bookMeetingDocsState = atom<IBookMeeting[]>({
  key: `bookMeetingDocs/${v4()}`,
  default: [],
});

export const bookFieldDocsState = atom<IFixedBookField[]>({
  key: `bookFieldDocs/${v4()}`,
  default: [],
});

export const voteDocsState = atom<IVote[]>({
  key: `voteDocs/${v4()}`,
  default: [],
});

export const subjectDocsState = atom<IWrittenDocs[]>({
  key: `subjectDocs/${v4()}`,
  default: [],
});

export const reviewDocsState = atom<IWrittenDocs[]>({
  key: `reviewDocs/${v4()}`,
  default: [],
});

export const recommendDocsState = atom<IWrittenDocs[]>({
  key: `recommendDocs/${v4()}`,
  default: [],
});
