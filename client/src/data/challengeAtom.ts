import { v4 } from 'uuid';

import { atom } from 'recoil';

import {
  ChallengeSentence,
  CompleteReadingChallenge,
  RereadingChallenge,
} from '@/types';

export const rereadingChallengeAtom = atom<RereadingChallenge[] | null>({
  key: `rereadingChallenge/${v4()}`,
  default: [],
});

export const completeReadingChallengeState =
  atom<CompleteReadingChallenge | null>({
    key: `completeReadingChallenge/${v4()}`,
    default: null,
  });

export const sentencesState = atom<ChallengeSentence[] | null>({
  key: `sentences/${v4()}`,
  default: null,
});
