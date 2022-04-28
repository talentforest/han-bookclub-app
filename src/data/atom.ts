import { getAuth, onAuthStateChanged } from "firebase/auth";
import { atom, useRecoilValue } from "recoil";
import { AuthUser } from "routes/Book";

const auth = getAuth();

export const currentUserState = atom<AuthUser | null>({
  key: "currentUser",
  default: null,
  effects: [
    ({ setSelf, onSet }) => {
      let resolvePromise: (value: AuthUser | null) => void;
      const initialValue = new Promise<AuthUser | null>((resolve) => {
        resolvePromise = resolve;
      });
      setSelf(initialValue);

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const { uid, email, displayName } = user;

          const authUser = {
            uid,
            email,
            displayName,
          };
          resolvePromise(authUser);
          setSelf(authUser);
        } else {
          resolvePromise(null);
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
