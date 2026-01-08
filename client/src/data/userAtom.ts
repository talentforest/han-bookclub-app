import { User, getAuth, onAuthStateChanged } from 'firebase/auth';
import { where } from 'firebase/firestore';

import { atom, atomFamily } from 'recoil';

import { getCollection, getDocument } from '@/api';

import { USER, isLoadingStatus } from '@/appConstants';

import { FirebaseAuthUser, LoadableStatus, UserProfile } from '@/types';

export const basePhotoAtom = atom<string | null>({
  key: 'basePhotoAtom',
  default: null,
});

export const currAuthUserAtom = atom<FirebaseAuthUser | null>({
  key: 'currAuthUserAtom',
  default: null,
  effects: [
    ({ setSelf }) => {
      const auth = getAuth();
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

export const userListAtom = atom<LoadableStatus<UserProfile[]>>({
  key: 'userListAtom',
  default: isLoadingStatus,
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      const constraints =
        process.env.NODE_ENV === 'development'
          ? []
          : [where('name', '!=', '테스트계정')];

      getCollection(USER, setSelf, ...constraints);
    },
  ],
});

// 다른 유저의 문서정보
export const userAtomFamily = atomFamily<LoadableStatus<UserProfile>, string>({
  key: 'userAtomFamily',
  default: isLoadingStatus,
  effects: (uid: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get' || !uid) return;
      getDocument(USER, uid, setSelf);
    },
  ],
});
