import { v4 } from 'uuid';

import { atom } from 'recoil';

interface FcmDocument {
  id?: string;
  notification?: boolean;
  createdAt?: string;
  tokens?: string[];
}

export const currUserFcmState = atom<FcmDocument>({
  key: `currUserFcm/${v4()}`,
  default: null,
});

export const notificationState = atom<NotificationPermission>({
  key: `notification/${v4()}`,
  default: 'default',
});
