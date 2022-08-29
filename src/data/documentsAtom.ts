import { IWrittenDocs } from "components/bookmeeting/Subjects";
import { atom } from "recoil";
import { IBookMeeting, IFixedBookField, IVote } from "util/getFirebaseDoc";
import { v4 } from "uuid";

export const bookMeetingsState = atom<IBookMeeting[]>({
  key: `bookMeetingDocs/${v4()}`,
  default: [],
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = "bookMeeting";
      const savedValue = localStorage.getItem(bookMeetingStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(bookMeetingStoreKey)
          : localStorage.setItem(bookMeetingStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const testbookMeetingsState = atom<IBookMeeting>({
  key: `bookMeetingDocs/${v4()}`,
  default: {} as IBookMeeting,
  effects: [
    ({ setSelf, onSet }) => {
      const bookMeetingStoreKey = "bookMeeting";
      const savedValue = localStorage.getItem(bookMeetingStoreKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(bookMeetingStoreKey)
          : localStorage.setItem(bookMeetingStoreKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const bookFieldsState = atom<IFixedBookField[]>({
  key: `bookFieldDocs/${v4()}`,
  default: [],
});

export const votesState = atom<IVote[]>({
  key: `voteDocs/${v4()}`,
  default: [],
});

export const subjectsState = atom<IWrittenDocs[]>({
  key: `subjectDocs/${v4()}`,
  default: [],
});

export const reviewsState = atom<IWrittenDocs[]>({
  key: `reviewDocs/${v4()}`,
  default: [],
});

export const recommendsState = atom<IWrittenDocs[]>({
  key: `recommendDocs/${v4()}`,
  default: [],
});
