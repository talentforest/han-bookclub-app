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
