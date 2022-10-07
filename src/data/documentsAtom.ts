import { IWrittenDocs } from "components/common/SubjectBox";
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

export const thisMonthState = atom<IBookMeeting>({
  key: `thisMonthBookMeeting/${v4()}`,
  default: {} as IBookMeeting,
  effects: [
    ({ setSelf, onSet }) => {
      const storeKey = "thisMonthBookMeeting";
      const savedValue = localStorage.getItem(storeKey);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem(storeKey)
          : localStorage.setItem(storeKey, JSON.stringify(newValue));
      });
    },
  ],
});

export const bookFieldsState = atom<IFixedBookField>({
  key: `bookFieldDocs/${v4()}`,
  default: {} as IFixedBookField,
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

export const hostReviewState = atom<IWrittenDocs[]>({
  key: `hostReview/${v4()}`,
  default: [],
});
