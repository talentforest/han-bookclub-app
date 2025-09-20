import { useState } from 'react';

import { getDeviceToken, sendMulticast, sendUnicast } from '@/fbase';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { NotificationData, PostTypeName, UserFcm } from '@/types';

export const useSendPushNotification = () => {
  const [isPending, setIsPending] = useState(false);

  const { uid: currentUserUid, displayName } = useRecoilValue(currAuthUserAtom);

  /**
   * 특정 유저에게 푸시 알림 보내기 함수
   * @param notificationData 알림의 세부내용
   * @param userFcm 값이 주어지지 않는 경우 '현재 유저'의 기기에 보내는 것이며, 주어진 경우 주어진 유저의 기기에 보내게 된다.
   * @returns result에 'success'나 'fail' 값이 담긴 객체를 반환한다.
   */
  const sendPushNotificationToUser: (
    notificationData: NotificationData,
    userFcm?: UserFcm,
  ) => Promise<{
    result: 'success' | 'fail';
  }> = async (notificationData: NotificationData, userFcm?: UserFcm) => {
    setIsPending(true);

    const { title, body, subPath, notification } = notificationData;
    const link = `${import.meta.env.VITE_PUBLIC_URL}${subPath || ''}`;

    try {
      if (!userFcm) {
        if (Notification.permission === 'denied') {
          alert(
            '현재 앱알림이 거부된 상태입니다. 모바일이라면 휴대폰 앱 설정에 들어가서 알림 설정을 켜주세요.',
          );
          return { result: 'fail' };
        }

        if (!notification) {
          return { result: 'fail' };
        }

        const token = await getDeviceToken();
        await sendUnicast({ title, body, token, link });
        return { result: 'success' };
      }

      if (userFcm) {
        if (!userFcm?.notification) {
          return { result: 'fail' };
        }
        userFcm.tokens.map(async token =>
          sendUnicast({ title, body, token, link }),
        );
        return { result: 'success' };
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  /** 현재 유저를 제외한 모든 유저에게 푸시 알림 보내기 함수 */
  const sendPushNotificationToAllUser = async ({
    title,
    body,
    subPath,
  }: Omit<NotificationData, 'notification'>) => {
    setIsPending(true);

    const link = `${import.meta.env.VITE_PUBLIC_URL}${subPath || ''}`;
    await sendMulticast({ title, body, link, uid: currentUserUid });

    setIsPending(false);
  };

  /** 현재 유저를 제외한 전체 유저에게 "게시물" 등록 푸시 알림 보내기 함수 */
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

  return {
    sendPostPushNotification,
    sendPushNotificationToUser,
    sendPushNotificationToAllUser,
    isPending,
  };
};
