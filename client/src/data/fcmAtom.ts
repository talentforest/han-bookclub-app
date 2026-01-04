import { atom } from 'recoil';

import { isLoadingStatus } from '@/appConstants';

import { LoadableStatus } from '@/types';

interface FcmDocument {
  id?: string;
  notification?: boolean;
  createdAt?: string;
  tokens?: string[];
}

export const currUserFcmAtom = atom<LoadableStatus<FcmDocument>>({
  key: 'currUserFcmAtom',
  default: isLoadingStatus,
});
