import { atom, atomFamily } from 'recoil';

import { getCollection, getDocument } from '@/api';

import { FCM_NOTIFICATION, isLoadingStatus } from '@/appConstants';

import { FcmDocument, LoadableStatus } from '@/types';

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

export const userFcmAtomFamily = atomFamily<
  LoadableStatus<FcmDocument>,
  string
>({
  key: 'userFcmAtomFamily',
  default: isLoadingStatus,
  effects: (uid: string) => [
    ({ setSelf, trigger }) => {
      if (trigger !== 'get') return;

      if (!uid) {
        setSelf({ status: 'loaded', data: null });
        return;
      }

      getDocument(FCM_NOTIFICATION, uid, setSelf);
    },
  ],
});
