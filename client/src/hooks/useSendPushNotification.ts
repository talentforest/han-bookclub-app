import { allUsersState, currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { getDeviceToken, sendMulticast, sendUnicast } from 'fbase';
import { PostType } from 'components/molecules/PostHandleBtns';

const useSendPushNotification = () => {
  const allUsers = useRecoilValue(allUsersState);
  const currentUser = useRecoilValue(currentUserState);

  // 상대방 알림 설정 여부값 가져오기
  const checkPermittedNotificationByUser = (uid: string) => {
    const user = allUsers.find((user) => user.id === uid);
    return user.notification;
  };

  // 전체 유저에게 게시물 등록 알림 보내기
  const sendPostNotification = async (type: PostType) => {
    const title = `🔥새로운 ${type} 등록`;

    const postposition =
      type === '모임 후기' || type === '공유하고 싶은 문구' ? '를' : '을';

    const body = `${currentUser.displayName}님이 ${type}${postposition} 작성하셨어요. 바로 확인해보세요!👀`;

    const subPath =
      type === '발제문'
        ? 'bookclub/subjects'
        : type === '정리 기록'
        ? 'bookclub/host-review'
        : type === '모임 후기' || type === '추천책'
        ? 'bookclub'
        : type === '공유하고 싶은 문구'
        ? 'challenge'
        : process.env.PUBLIC_URL;

    const link = `${process.env.PUBLIC_URL}/${subPath}`;

    sendMulticast({ title, body, link, uid: currentUser.uid }) //
      .catch((err) => console.log(err));
  };

  // 현재 유저에게만 알림 보내기
  const sendNotificationToCurrentUser = async (notificationData: {
    title: string;
    body: string;
    link: string;
  }) => {
    const { title, body, link } = notificationData;

    getDeviceToken()
      .then((token) => {
        sendUnicast({ title, body, token, link });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    sendPostNotification,
    checkPermittedNotificationByUser,
    sendNotificationToCurrentUser,
  };
};

export default useSendPushNotification;
