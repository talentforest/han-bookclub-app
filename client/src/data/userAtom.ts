import { atom } from 'recoil';

import { BookField } from 'appConstants';
import { authService } from 'fbase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 } from 'uuid';

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
  sentences: IUserPostDocId[];
}

export interface IUserDataDoc {
  name: string;
  favoriteBookField: BookField[];
  email: string;
  displayName: string;
  photoURL: string;
  id?: string;
  tagColor: string;
  userRecords: IUserPostDocs;
  notification?: boolean;
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
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;

          const authUser = {
            uid: uid ?? '',
            email: email ?? '',
            displayName: displayName ?? '익명의 방문자',
            photoURL: photoURL ?? '',
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
