import { getCollection, getDocument } from 'api/firebase/getFbDoc';

import { atom, atomFamily } from 'recoil';

import { BookField, USER } from 'appConstants';
import { authService } from 'fbase';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 } from 'uuid';

export type IAuthUser = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
};

export interface IUserPostDocId {
  docId: string;
  monthId: string;
}

export interface IUserPosts {
  hostReviews: IUserPostDocId[];
  subjects: IUserPostDocId[];
  reviews: IUserPostDocId[];
  recommendedBooks: IUserPostDocId[];
  sentences: IUserPostDocId[];
}

export interface IUser {
  id?: string;
  name: string;
  displayName: string;
  email: string;
  photoURL: string;
  favoriteBookField: BookField[];
  tagColor: string;
  notification?: boolean;
  userRecords: IUserPosts;
}

const auth = getAuth();

export const refreshUserAtom = atom({
  key: `refreshUser/${v4}`,
  default: authService.currentUser,
  effects: [
    ({ setSelf }) => {
      setSelf(authService.currentUser);
    },
  ],
});

export const allUsersAtom = atom<IUser[]>({
  key: `allUsers/${v4}`,
  default: [],
  effects: [
    ({ setSelf }) => {
      getCollection(USER, setSelf);
    },
  ],
});

export const currAuthUserAtom = atom<IAuthUser | null>({
  key: `currUser/${v4}`,
  default: null,
  effects: [
    ({ setSelf }) => {
      const unsubscribe = onAuthStateChanged(auth, user => {
        if (user) {
          const { uid, email, displayName, photoURL } = user;

          const authUser: Pick<
            User,
            'uid' | 'email' | 'displayName' | 'photoURL'
          > = {
            uid: uid ?? '',
            email: email ?? '',
            displayName: displayName ?? '익명의 방문자',
            photoURL: photoURL ?? '',
          };

          setSelf(authUser);
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

// 나의 문서정보
// const currentUidSelector = selector({
//   key: 'currentUidSelector',
//   get: ({ get }) => {
//     const authUser = get(currAuthUserAtom);
//     return authUser?.uid ?? null;
//   },
// });

// 다른 유저의 문서정보
export const userDocAtomFamily = atomFamily<IUser | null, string>({
  key: `user/${v4}`,
  default: {} as IUser,
  effects: (uid: string) => [
    ({ setSelf }) => {
      if (uid) {
        getDocument(USER, uid, setSelf); // UID별 데이터 가져오기
      }
    },
  ],
});
