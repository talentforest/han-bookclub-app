import { atom } from "recoil";
import { IVoteItem } from "util/getFirebaseDoc";
import { v4 } from "uuid";

export const voteItemState = atom<IVoteItem[]>({
  key: `voteItem${v4()}`,
  default: [],
});
