import { BookFieldType } from 'components/organisms/login/BookField';
import { authService } from 'fbase';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { atom } from 'recoil';
import { v4 } from 'uuid';

export interface IUserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

export interface IUserRecord {
  docId: string;
  monthId: string;
}

export interface IUserRecords {
  hostReviews: IUserRecord[];
  subjects: IUserRecord[];
  reviews: IUserRecord[];
  recommendedBooks: IUserRecord[];
}

export interface IExtraUserData {
  name: string;
  favoriteBookField: BookFieldType[];
  email: string;
  displayName: string;
  photoUrl: string;
  id?: string;
  userRecords: IUserRecords;
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

export const allUsersState = atom<IExtraUserData[]>({
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

export const userExtraInfoState = atom<IExtraUserData>({
  key: `userExtraInfo/${v4}`,
  default: {} as IExtraUserData,
});
