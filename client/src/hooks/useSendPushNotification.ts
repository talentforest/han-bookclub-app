import { allUsersState, currentUserState } from 'data/userAtom';
import { useRecoilValue } from 'recoil';
import { getDeviceToken } from 'fbase';
import axios from 'axios';

const useSendPushNotification = () => {
  const allUsers = useRecoilValue(allUsersState);
  const currentUser = useRecoilValue(currentUserState);

  // 상대방 알림 설정 여부값 가져오기
  const checkPermittedNotificationByUser = (uid: string) => {
    const user = allUsers.find((user) => user.id === uid);
    return user.notification;
  };

  const postNotification = async (
    url: string,
    data: {
      title: string;
      body?: string;
      token?: string;
      link?: string;
    }
  ) => {
    return axios
      .post(url, data)
      .then((response) => {
        console.log('Notification sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('There was an error sending the notification:', error);
      });
  };

  // 전체 유저에게 게시물 등록 알림 보내기
  const sendPostNotification = async (
    type: '발제문' | '정리 기록' | '추천책' | '모임 후기'
  ) => {
    const title = `${type}${type === '모임 후기' ? '가' : '이'} 등록되었어요!`;

    const body = `${currentUser.displayName}님이 등록한 ${type}${
      type === '모임 후기' ? '를' : '을'
    } 확인하러 가볼까요?`;

    const url = `${process.env.REACT_APP_SEND_NOTIFICATION_API}/send-multicast`;

    postNotification(url, {
      title,
      body,
    });
  };

  // 현재 유저에게만 알림 보내기
  const sendNotificationToCurrentUser = async (notificationData: {
    title: string;
    body?: string;
  }) => {
    getDeviceToken().then((token) => {
      postNotification(
        `${process.env.REACT_APP_SEND_NOTIFICATION_API}/send-notification`,
        {
          ...notificationData,
          token,
        }
      );
    });
  };

  return {
    sendPostNotification,
    checkPermittedNotificationByUser,
    sendNotificationToCurrentUser,
  };
};

export default useSendPushNotification;
