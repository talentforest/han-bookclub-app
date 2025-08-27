import { v4 } from 'uuid';

import { atom } from 'recoil';

interface FcmDocument {
  id: string;
  notification?: boolean;
  createdAt?: number;
  tokens?: string[];
}

export const fcmState = atom<FcmDocument>({
  key: `fcmDocument/${v4()}`,
  default: null,
});

export const notificationState = atom<NotificationPermission>({
  key: `notification/${v4()}`,
  default: 'default',
});
