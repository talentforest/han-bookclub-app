export type UserFcm = {
  docId: string;
  createdAt: string;
  tokens: string[];
  notification: boolean;
};

export type NotificationData = {
  title: string;
  body: string;
  notification: boolean;
  subPath?: string;
};
