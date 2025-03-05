import { allUsersAtom, currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { DOMAIN } from 'appConstants';
import { getDeviceToken, sendMulticast, sendUnicast } from 'fbase';

import { PostType } from 'components/post/PostHandleBtns';

const useSendPushNotification = () => {
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
    const title = `🗳️새로운 투표함 등록`;
    const body = `${voteTitle} 투표함이 등록되었습니다. 종료일 전에 투표를 완료해주세요!⚡️`;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath}`;

    sendMulticast({ title, body, link, uid }).catch(err => console.log(err));
  };

  // 전체 유저에게 챌린지 완주 알림
  const sendCompleteChallengePushNotification = async ({
    bookTitle,
  }: {
    bookTitle: string;
  }) => {
    const title = `🔥챌린지 완주 성공`;
    const body = `${displayName}님이 📚${bookTitle} 챌린지를 완주했습니다! 같이 힘내서 끝까지 완주해봐요!`;
    const subPath = '/challenge';
    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath}`;

    sendMulticast({ title, body, link, uid }) //
      .catch(err => console.log(err));
  };

  // 전체 유저에게 장소 / 시간 변경 알림
  const sendPlaceTimePushNotification = async ({
    type,
    data,
  }: {
    type: '모임 시간' | '모임 장소';
    data: string | Date;
  }) => {
    const title = `☕️${type} 변경`;
    const body = `${type}${
      type === '모임 시간' ? '이' : '가'
    } ${data}로 변경되었습니다! 그럼 모임때 만나요👋`;

    const link = `${process.env.PUBLIC_URL}`;

    sendMulticast({ title, body, link, uid }) //
      .catch(err => console.log(err));
  };

  // 전체 유저에게 게시물 등록 알림 보내기
  const sendPostNotification = async (type: PostType) => {
    const title = `🔥새로운 ${type} 등록`;

    const postposition =
      type === '모임 후기' || type === '공유하고 싶은 문구' ? '를' : '을';

    const body = `${displayName}님이 ${type}${postposition} 작성하셨어요. 바로 확인해보세요!👀`;

    const subPath: { [key in PostType]: string } = {
      발제문: '/bookclub/subjects',
      '정리 기록': '/bookclub/host-review',
      '모임 후기': '/bookclub',
      추천책: '/bookclub',
      '공유하고 싶은 문구': '/challenge',
      '불참 후기': '',
    };

    const link = `${DOMAIN}${process.env.PUBLIC_URL}${subPath[type]}`;
    sendMulticast({ title, body, link, uid }) //
      .catch(err => console.log(err));
  };

  // 현재 유저에게만 알림 보내기
  const sendNotificationToCurrentUser = async (notificationData: {
    title: string;
    body: string;
  }) => {
    const { title, body } = notificationData;
    const link = `${DOMAIN}${process.env.PUBLIC_URL}`;
    getDeviceToken()
      .then(token => {
        sendUnicast({ title, body, token, link });
      })
      .catch(err => console.log(err));
  };

  return {
    checkPermittedNotificationByUser,
    sendPostNotification,
    sendCompleteChallengePushNotification,
    sendNotificationToCurrentUser,
    sendVotePushNotification,
    sendPlaceTimePushNotification,
  };
};

export default useSendPushNotification;
