import { atom, atomFamily } from 'recoil';

import { getCollection, getDocument } from '@/api/firebase/getFbDoc';
import { USER } from '@/appConstants';
import { authService } from '@/fbase';
import { FirebaseAuthUser, UserProfile } from '@/types';
import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { v4 } from 'uuid';

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

export const allUsersAtom = atom<UserProfile[]>({
  key: `allUsers/${v4}`,
  default: [],
  effects: [
    ({ setSelf }) => {
      getCollection(USER, setSelf);
    },
  ],
});

export const currAuthUserAtom = atom<FirebaseAuthUser | null>({
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
export const userDocAtomFamily = atomFamily<UserProfile | null, string>({
  key: `user/${v4}`,
  default: {} as UserProfile,
  effects: (uid: string) => [
    ({ setSelf }) => {
      if (uid) {
        getDocument(USER, uid, setSelf); // UID별 데이터 가져오기
      }
    },
  ],
});
