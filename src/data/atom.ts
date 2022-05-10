import { authService } from "fbase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { atom } from "recoil";
import { v4 } from "uuid";

const auth = getAuth();

export const refreshUserState = atom({
  key: `refreshUser/${v4}`,
  default: authService.currentUser?.displayName,
});

export const currentUserState = atom<User | null>({
  key: `currentUser/${v4}`,
  default: null,

  effects: [
    ({ setSelf, onSet }) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;
          const authUser = {
            uid,
            email,
            displayName,
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
