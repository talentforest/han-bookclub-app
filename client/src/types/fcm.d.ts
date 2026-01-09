export type FcmDocument = {
  docId?: string;
  notification: boolean;
  tokens: string[];
  createdAt: string;
  updatedAt: string;
};

export type NotificationData = {
  title: string;
  body: string;
  notification: boolean;
  subPath?: string;
};
