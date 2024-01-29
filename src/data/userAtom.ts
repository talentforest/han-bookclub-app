import { BookFieldType } from 'components/molecules/BookFieldCheckBox';
import { authService } from 'fbase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { atom } from 'recoil';
import { v4 } from 'uuid';
import { ISentence } from './bookAtom';

export interface IUserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface IUserPostDocId {
  docId: string;
  monthId: string;
}

export interface IUserPostDocs {
  hostReviews: IUserPostDocId[];
  subjects: IUserPostDocId[];
  reviews: IUserPostDocId[];
  recommendedBooks: IUserPostDocId[];
  sentences: ISentence[];
}

export interface IUserDataDoc {
  name: string;
  favoriteBookField: BookFieldType[];
  email: string;
  displayName: string;
  photoURL: string;
  id?: string;
  userRecords: IUserPostDocs;
}

const auth = getAuth();

export const refreshUserState = atom({
  key: `refreshUser/${v4}`,
  default: authService.currentUser,
  effects: [
    ({ setSelf }) => {
      setSelf(authService.currentUser);
    },
  ],
});

export const allUsersState = atom<IUserDataDoc[]>({
  key: `allUsers/${v4}`,
  default: [],
});

export const currentUserState = atom<IUserData | null>({
  key: `userData/${v4}`,
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;

          const authUser = {
            uid: uid ? uid : '',
            email: email ? email : '',
            displayName: displayName ? displayName : '익명의 방문자',
            photoURL: photoURL ? photoURL : '',
          };

          setSelf(authUser as User);
        } else {
          setSelf(null);
        }
      });

      return () => {
        unsubscribe();
      };
    },
  ],
});

export const userExtraInfoState = atom<IUserDataDoc>({
  key: `userExtraInfo/${v4}`,
  default: {} as IUserDataDoc,
});
