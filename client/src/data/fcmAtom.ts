import { atom, selectorFamily } from 'recoil';

import { getCollection } from '@/api';

import {
  FCM_NOTIFICATION,
  isLoadingStatus,
  loadedStatus,
} from '@/appConstants';

import { LoadableStatus } from '@/types';

interface FcmDocument {
  docId?: string;
  notification?: boolean;
  createdAt?: string;
  tokens?: string[];
}

export const userFcmListAtom = atom<LoadableStatus<FcmDocument[]>>({
  key: 'userFcmListAtom',
  default: isLoadingStatus,
  effects: [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;
      getCollection(FCM_NOTIFICATION, setSelf);
    },
  ],
});

export const userFcmSelectorFamily = selectorFamily<
  LoadableStatus<FcmDocument>,
  string
>({
  key: 'userFcmSelectorFamily',
  get:
    (userId: string) =>
    ({ get }) => {
      const { data: userFcmList, status } = get(userFcmListAtom);
      if (status === 'isLoading' || !userId) return isLoadingStatus;
      const data = userFcmList?.find(({ docId }) => docId === userId);

      return { ...loadedStatus, data: data || null };
    },
});
