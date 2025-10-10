import { useState } from 'react';

import { getDeviceToken, sendMulticast, sendUnicast } from '@/fbase';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { thisMonth } from '@/utils';

import { NotificationData, PostTypeName, UserFcm } from '@/types';

type PushNotificationObj = {
  [key in PostTypeName]: {
    title: string;
    body: string;
    subPath: string;
  };
};

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
  // 다음달로 넘어갔는데 알림을 클릭하는 경우
  const sendPostPushNotification = async (
    type: PostTypeName,
    yearMonthId?: string,
  ) => {
    setIsPending(true);

    try {
      if (!currentUserUid || !type) {
        return { result: 'fail' };
      }

      const month = +yearMonthId?.slice(-2) || +thisMonth;

      const postPushNotificationObj: {
        [key in PostTypeName]: {
          title: string;
          body: string;
          subPath: string;
        };
      } = {
        발제문: {
          title: '🗃️새로운 발제문 등록',
          body: `${displayName}님이 ${month}월 발제문을 등록했어요. 바로 확인해볼까요?👀`,
          subPath: '/bookclub',
        },
        '정리 기록': {
          title: '🗃️새로운 정리기록 등록',
          body: `${displayName}님이 ${month}월 정리기록을 작성하셨어요. 바로 확인해볼까요?👀`,
          subPath: '/bookclub',
        },
        '모임 후기': {
          title: '📨새로운 모임후기 등록',
          body: `${displayName}님이 모임후기를 작성하셨어요. 바로 확인해보세요!👀`,
          subPath: '/bookclub',
        },
        추천책: {
          title: '📚새로운 추천책 등록',
          body: `${displayName}님이 ${month}월 추천책을 작성하셨어요.`,
          subPath: '/bookclub',
        },
        챌린지: {
          title: '🎉챌린지 달성',
          body: `${displayName}님이 챌린지를 달성하셨어요. 같이 챌린지를 완주해봅시다!✨`,
          subPath: '/bookclub',
        },
        '공유하고 싶은 문구': {
          title: '📝공유하고 싶은 문구 등록',
          body: `${displayName}님이 공유하고 싶은 문구를 작성하셨어요.`,
          subPath: '/bookclub',
        },
      };

      const { title, body, subPath } = postPushNotificationObj[type];

      const link = `${import.meta.env.VITE_PUBLIC_URL}${subPath}`;

      await sendMulticast({ title, body, link, uid: currentUserUid });

      return { result: 'success' };
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  const getNotificationObj = (type: PostTypeName, yearMonthId?: string) => {
    const month = +yearMonthId?.slice(-2) || +thisMonth;
    const monthSegment = yearMonthId ? `/${yearMonthId}` : '';

    const postPushNotificationObj: PushNotificationObj = {
      발제문: {
        title: '🗃️새로운 발제문 등록',
        body: `${displayName}님이 ${month}월 발제문을 등록했어요. 바로 확인해볼까요?👀`,
        subPath: `/bookclub${monthSegment}/subjects`,
      },
      '정리 기록': {
        title: '🗃️새로운 정리기록 등록',
        body: `${displayName}님이 ${month}월 모임 정리기록을 등록했어요. 바로 확인해볼까요?👀`,
        subPath: `/bookclub${monthSegment}/host-review`,
      },
      '모임 후기': {
        title: '📨새로운 모임후기 등록',
        body: `${displayName}님이 모임후기를 등록했어요. 바로 확인해보세요!👀`,
        subPath: `/bookclub${monthSegment}`,
      },
      추천책: {
        title: '📚새로운 추천책 등록',
        body: `${displayName}님이 ${month}월 모임 추천책을 등록했어요.`,
        subPath: `/bookclub${monthSegment}`,
      },
      챌린지: {
        title: '🎉챌린지 달성',
        body: `${displayName}님이 챌린지를 달성하셨어요. 어떤 챌린지를 달성했는지 한번 확인하러 가볼까요?!✨`,
        subPath: '/challenge',
      },
      '공유하고 싶은 문구': {
        title: '📝공유하고 싶은 문구 등록',
        body: `${displayName}님이 공유하고 싶은 문구를 작성하셨어요.`,
        subPath: '/bookclub',
      },
    };

    return postPushNotificationObj[type];
  };

  const sendTestToMe: (
    postType: PostTypeName,
    yearMonthId?: string,
  ) => Promise<{
    result: 'success' | 'fail';
  }> = async (postType: PostTypeName, yearMonthId?: string) => {
    setIsPending(true);

    try {
      if (Notification.permission === 'denied') {
        alert(
          '현재 앱알림이 거부된 상태입니다. 모바일이라면 휴대폰 앱 설정에 들어가서 알림 설정을 켜주세요.',
        );
        return { result: 'fail' };
      }

      if (!currentUserUid || !postType) {
        return { result: 'fail' };
      }

      const { title, body, subPath } = getNotificationObj(
        postType,
        yearMonthId,
      );

      const link = `http://localhost:3000/han-bookclub-app${subPath}`;

      const token = await getDeviceToken();

      await sendUnicast({ title, body, token, link });

      return { result: 'success' };
    } catch (error) {
      console.log(error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    sendTestToMe,
    sendPostPushNotification,
    sendPushNotificationToUser,
    sendPushNotificationToAllUser,
    isPending,
  };
};
