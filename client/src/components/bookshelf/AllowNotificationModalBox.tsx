import { useEffect, useState } from 'react';

import useSendPushNotification from 'hooks/useSendPushNotification';

import { fcmState } from 'data/fcmAtom';
import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import { FCM_NOTIFICATION } from 'appConstants';
import { authService, dbService, getDeviceToken } from 'fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import SquareBtn from 'components/common/button/SquareBtn';

export default function AllowNotificationModalBox() {
  const [showModal, setShowModal] = useState(false);
  const fcmDoc = useRecoilValue(fcmState);
  const { uid } = useRecoilValue(currAuthUserAtom);

  const anonymous = authService.currentUser?.isAnonymous;

  const { sendNotificationToCurrentUser } = useSendPushNotification();

  const toggleModal = () => setShowModal(prev => !prev);

  const handleLocalStorage = (type: 'get' | 'set', notification?: boolean) => {
    const storeKey = 'notification'; // 유저가 알림 허용 여부를 이미 설정했을 때

    if (type === 'set') {
      return localStorage.setItem(storeKey, JSON.stringify(notification));
    }
    if (type === 'get') {
      return localStorage.getItem(storeKey);
    }
  };

  const saveFcmDataInDB = async () => {
    const token = await getDeviceToken();
    const existCurrentTokenInDB = fcmDoc?.tokens?.includes(token);
    if (existCurrentTokenInDB) return;

    const document = doc(dbService, FCM_NOTIFICATION, uid);
    // 다른 기기에서 허용한 적이 있는 경우
    if (fcmDoc?.notification === true) {
      const fcmData = {
        createdAt: Date.now(),
        tokens:
          fcmDoc?.tokens?.length !== 0 ? [...fcmDoc?.tokens, token] : [token],
      };
      await updateDoc(document, fcmData);
    } else {
      // 다른 기기에서도 허용한 적이 없는 경우
      const fcmData = {
        createdAt: Date.now(),
        notification: true,
        tokens: [token],
      };
      await setDoc(document, fcmData);
    }
  };

  const onPermitClick = async () => {
    if (!('Notification' in window)) {
      alert('현재 브라우저에서는 알림을 지원하지 않습니다.');
      return toggleModal();
    }

    if (anonymous) {
      alert('익명의 방문자는 알림을 받을 수 없습니다.');
      return toggleModal();
    }

    const notificationData = {
      title: '💌알림 시작 안내',
      body: '이제부터 독서모임 한페이지에서 유용한 알림들을 보내드릴게요❣️',
      link: process.env.PUBLIC_URL,
    };

    if (Notification.permission === 'granted') {
      sendNotificationToCurrentUser(notificationData);
      saveFcmDataInDB();
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        sendNotificationToCurrentUser(notificationData);
        saveFcmDataInDB();
      }
    }

    handleLocalStorage('set', true);
    toggleModal();
  };

  const onRefuseClick = async () => {
    if (anonymous) return toggleModal();

    const document = doc(dbService, FCM_NOTIFICATION, uid);

    const fcmData = {
      notification: false,
      createdAt: Date.now(),
    };
    await setDoc(document, fcmData);

    handleLocalStorage('set', false);
    toggleModal();
  };

  useEffect(() => {
    const notification = handleLocalStorage('get');

    if (notification === null) {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {fcmDoc !== null && showModal ? (
        <div>
          <h3>독서모임 한페이지는 알림(push)을 보낼 수 있어요.</h3>
          <p>
            발제문이나 모임 후기와 같은 게시물이 올라오면 알림을 받아보시겠어요?
          </p>
          <div>
            <SquareBtn name="허용하기" handleClick={onPermitClick} />
            <SquareBtn
              name="거절하기"
              color="gray"
              handleClick={onRefuseClick}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
