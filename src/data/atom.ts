import { getAuth, onAuthStateChanged } from "firebase/auth";
import { atom, useRecoilValue } from "recoil";
import { AuthUser } from "routes/Book";

const auth = getAuth();

export const currentUserState = atom<AuthUser | null>({
  key: "currentUser",
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

export function useAuthUser() {
  return useRecoilValue(currentUserState);
}
