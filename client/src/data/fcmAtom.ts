import { atomFamily } from 'recoil';

import { getDocument } from '@/api';

import { FCM_NOTIFICATION, isLoadingStatus } from '@/appConstants';

import { LoadableStatus } from '@/types';

interface FcmDocument {
  docId?: string;
  notification?: boolean;
  createdAt?: string;
  tokens?: string[];
}

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
