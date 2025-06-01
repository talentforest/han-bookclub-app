import { useState } from 'react';

import { allUsersAtom, currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { DOMAIN } from 'appConstants';
import { getDeviceToken, sendMulticast, sendUnicast } from 'fbase';

import { PostType } from 'components/post/PostHandleBtns';

const useSendPushNotification = () => {
  const [isPending, setIsPending] = useState(false);

  const allUsers = useRecoilValue(allUsersAtom);

  const { uid, displayName } = useRecoilValue(currAuthUserAtom);

  // 상대방 알림 설정 여부값 가져오기
  const checkPermittedNotificationByUser = (uid: string) => {
    const user = allUsers.find(({ id }) => id === uid);
    return user.notification;
  };

  // 전체 유저에게 투표함 등록 알림 보내기
  const sendVotePushNotification = async ({
    voteTitle,
    subPath,
  }: {
    voteTitle: string;
    subPath: string;
  }) => {
    setIsPending(true);

    const title = `🗳️새로운 투표함 등록`;
    const body = `${voteTitle} 투표함이 등록되었습니다. 종료일 전에 투표를 완료해주세요!⚡️`;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath}`;

    await sendMulticast({ title, body, link, uid });
    setIsPending(false);
  };

  // 전체 유저에게 챌린지 완주 알림
  const sendCompleteChallengePushNotification = async ({
    bookTitle,
  }: {
    bookTitle: string;
  }) => {
    setIsPending(true);

    const title = `🔥챌린지 완주 성공`;
    const body = `${displayName}님이 📚${bookTitle} 챌린지를 완주했습니다! 같이 힘내서 끝까지 완주해봐요!`;
    const subPath = '/challenge';
    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath}`;

    await sendMulticast({ title, body, link, uid });
    setIsPending(false);
  };

  // 전체 유저에게 장소 / 시간 변경 알림
  const sendPlaceTimePushNotification = async ({
    type,
    data,
  }: {
    type: '모임 시간' | '모임 장소';
    data: string | Date;
  }) => {
    setIsPending(true);

    const title = `☕️${type} 변경`;
    const body = `${type}${
      type === '모임 시간' ? '이' : '가'
    } ${data}로 변경되었습니다! 그럼 모임때 만나요👋`;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}`;

    await sendMulticast({ title, body, link, uid });
    setIsPending(false);
  };

  // 전체 유저에게 게시물 등록 알림 보내기
  const sendPostNotification = async (type: PostType) => {
    setIsPending(true);

    const title = `🔥새로운 ${type} 등록`;
    const postposition =
      type === '모임 후기' || type === '공유하고 싶은 문구' ? '를' : '을';
    const body = `${displayName}님이 ${type}${postposition} 작성하셨어요. 바로 확인해보세요!👀`;
    const subPath: Partial<{ [key in PostType]: string }> = {
      발제문: '/bookclub/subjects',
      '정리 기록': '/bookclub/host-review',
      '모임 후기': '/bookclub',
      추천책: '/bookclub',
      '공유하고 싶은 문구': '/challenge',
    };
    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath[type]}`;

    console.log(link);

    await sendMulticast({ title, body, link, uid });
    setIsPending(false);
  };

  // 전체 유저에게 다음달 도서 알림 보내기
  const sendNextMonthClubBookNotification = async (
    nextMonthBookTitle: string,
  ) => {
    setIsPending(true);

    const title = `🔥새로운 다음달 도서 등록!`;
    const body = `${displayName}님이 다음달 도서로 ${nextMonthBookTitle}를 등록하셨습니다! 다음달에 봐요!`;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}`;

    await sendMulticast({ title, body, link, uid });
    setIsPending(false);
  };

  // 현재 유저에게만 알림 보내기
  const sendNotificationToCurrentUser = async (notificationData: {
    title: string;
    body: string;
  }) => {
    setIsPending(true);

    const { title, body } = notificationData;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}`;
    const token = await getDeviceToken();

    await sendUnicast({ title, body, token, link });
    setIsPending(false);
  };

  const sendNotificationToAllUser = async ({
    title,
    body,
  }: {
    title: string;
    body: string;
  }) => {
    setIsPending(true);

    const link = `${DOMAIN}${process.env.PUBLIC_URL}`;
    await sendMulticast({ title, body, link, uid });

    setIsPending(false);
  };

  return {
    checkPermittedNotificationByUser,
    sendPostNotification,
    sendCompleteChallengePushNotification,
    sendVotePushNotification,
    sendPlaceTimePushNotification,
    sendNotificationToCurrentUser,
    sendNotificationToAllUser,
    sendNextMonthClubBookNotification,
    isPending,
  };
};

export default useSendPushNotification;
