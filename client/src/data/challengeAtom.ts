import { atom } from 'recoil';

import { v4 } from 'uuid';

export type ChallengeRereading = {
  [key: string]: {
    book: {
      title: string;
      thumbnail: string;
      publisher: string;
      authors: string[];
    };
    impressionList: { id: number; text: string; createdAt: string }[];
    counts: number;
  };
};

export type ChallengeRank = {
  creatorId: string;
  id: string;
  rank: number;
  totalCounts: number;
};

export const challengeRereadingState = atom<ChallengeRereading>({
  key: `challengeRereading${v4()}`,
  default: null,
});
