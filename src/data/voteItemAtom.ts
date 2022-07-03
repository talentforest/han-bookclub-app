import { atom } from "recoil";
import { VoteItem } from "util/getFirebaseDoc";
import { v4 } from "uuid";

export const voteItemState = atom<VoteItem[]>({
  key: `voteItem${v4()}`,
  default: [],
});
