import { getAuth } from "firebase/auth";

export function refreshUser(setUserObj: (userObj: {}) => void) {
  const user = getAuth().currentUser;

  setUserObj({ ...user });
}
