import { useState } from 'react';

import { getDeviceToken, sendMulticast, sendUnicast } from '@/fbase';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { PostTypeName, UserFcm } from '@/types';

export const useSendPushNotification = () => {
  const [isPending, setIsPending] = useState(false);

  const { uid: currentUserUid, displayName } = useRecoilValue(currAuthUserAtom);

  // 특정 유저에게만 알림 보내기
  const sendPushNotificationToUser = async (notificationData: {
    title: string;
    body: string;
    userFcm?: UserFcm;
  }) => {
    setIsPending(true);

    const { title, body, userFcm } = notificationData;
    const link = `${import.meta.env.VITE_PUBLIC_URL}`;

    if (!userFcm) {
      const token = await getDeviceToken();
      await sendUnicast({ title, body, token, link });
    }

    if (userFcm) {
      userFcm.tokens.map(async token =>
        sendUnicast({ title, body, token, link }),
      );
    }

    setIsPending(false);
  };

  // 현재 유저 제외 모든 유저에게 알림 보내기
  const sendPushNotificationToAllUser = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    setIsPending(true);

    const link = `${import.meta.env.VITE_PUBLIC_URL}`;
    await sendMulticast({ title, body, link, uid: currentUserUid });

    setIsPending(false);
  };

  // 현재 유저 제외 전체 유저에게 게시물 등록 알림 보내기
  const sendPostPushNotification = async (type: PostTypeName) => {
    setIsPending(true);

    const postposition =
      type === '모임 후기' || type === '공유하고 싶은 문구' ? '를' : '을';

    const title = `🔥새로운 ${type} 등록`;

    const body = `${displayName}님이 ${type}${postposition} 작성하셨어요. 바로 확인해보세요!👀`;

    const subPath: Partial<{ [key in PostTypeName]: string }> = {
      발제문: '/bookclub/subjects',
      '정리 기록': '/bookclub/host-review',
      '모임 후기': '/bookclub',
      추천책: '/bookclub',
      '공유하고 싶은 문구': '/challenge',
    };

    const link = `${import.meta.env.VITE_PUBLIC_URL}${subPath[type]}`;

    await sendMulticast({ title, body, link, uid: currentUserUid });
    setIsPending(false);
  };

  // 현재 유저 제외 공통
  const sendPushNotification = async ({
    title,
    body,
    subPath,
  }: {
    title: string;
    body: string;
    subPath?: string;
  }) => {
    setIsPending(true);

    const link = `${import.meta.env.VITE_PUBLIC_URL}${subPath || ''}`;
    await sendMulticast({ title, body, link, uid: currentUserUid });

    setIsPending(false);
  };

  return {
    sendPostPushNotification,
    sendPushNotificationToUser,
    sendPushNotificationToAllUser,
    sendPushNotification,
    isPending,
  };
};
