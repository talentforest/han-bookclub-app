import { atom } from 'recoil';

import {
  ChallengeSentence,
  CompleteReadingChallenge,
  RereadingChallenge,
} from '@/types';
import { v4 } from 'uuid';

export const rereadingChallengeState = atom<RereadingChallenge>({
  key: `rereadingChallenge/${v4()}`,
  default: null,
});

export const completeReadingChallengeState = atom<CompleteReadingChallenge>({
  key: `completeReadingChallenge/${v4()}`,
  default: null,
});

export const sentencesState = atom<ChallengeSentence[]>({
  key: `sentences/${v4()}`,
  default: null,
});
