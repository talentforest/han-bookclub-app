import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';

import { FCM_NOTIFICATION } from '@/appConstants';
import { fcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';
import { authService, dbService, getDeviceToken } from '@/fbase';
import useSendPushNotification from '@/hooks/useSendPushNotification';
import MobileHeader from '@/layout/mobile/MobileHeader';
import { formatDate } from '@/utils';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

export default function NotificationSetting() {
  const [isActive, setIsActive] = useState(false);

  const fcmDoc = useRecoilValue(fcmState);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const anonymous = authService.currentUser?.isAnonymous;

  const { sendNotificationToCurrentUser } = useSendPushNotification();

  const saveFcmDataInDB = async () => {
    const token = await getDeviceToken();

    const existCurrentTokenInDB = fcmDoc?.tokens?.includes(token);
    if (existCurrentTokenInDB) return;

    const document = doc(dbService, FCM_NOTIFICATION, uid);

    const fcmDataToSave = {
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      notification: true,
      tokens: [token],
    };

    if (fcmDoc?.notification === true) {
      const newTokens = [...fcmDoc?.tokens, token];
      const fcmData = { ...fcmDataToSave, tokens: newTokens };
      await updateDoc(document, fcmData);
    } else {
      await setDoc(document, fcmDataToSave);
    }
  };

  const onPermitClick = async () => {
    if (!('Notification' in window)) {
      alert('현재 브라우저에서는 알림을 지원하지 않습니다.');
      return;
    }

    if (anonymous) {
      alert('익명의 방문자는 알림을 받을 수 없습니다.');
      return;
    }

    const notificationData = {
      title: '💌알림 시작 안내',
      body: '이제부터 독서모임 한페이지에서 유용한 알림들을 보내드릴게요❣️',
      link: import.meta.env.VITE_PUBLIC_URL,
    };

    // 만약 off했다가 다시 on하면??
    if (Notification.permission === 'granted') {
      saveFcmDataInDB();
      sendNotificationToCurrentUser(notificationData);
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        saveFcmDataInDB();
        sendNotificationToCurrentUser(notificationData);
      }
    }
  };

  const onRefuseClick = async () => {
    const document = doc(dbService, FCM_NOTIFICATION, uid);

    const fcmData = {
      notification: false,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    await setDoc(document, fcmData);
  };

  const handleNotification = () => {
    if (isActive) {
      onRefuseClick();
    } else {
      onPermitClick();
    }
    setIsActive(prev => !prev);
  };

  // DB에도 허용이 안되어 있고, 앱 자체에도 허용이 안되어 있는 경우
  // 여기는 디폴트 OFF. DB에 저장도 하고 허용 알림까지 떠야함.
  useEffect(() => {
    // 기기 알림 허용 && DB 알림값 허용, 토큰값 저장 / 디폴트 ON
    if (fcmDoc?.notification && Notification.permission === 'granted') {
      setIsActive(true);
    }
    // DB에는 허용이 되어 있지만 앱 자체에서 허용이 되어 있지 않은 경우
    // 여기는 디폴트 OFF. 허용 알림까지 떠야함.
  }, [fcmDoc?.notification]);

  return (
    <>
      <MobileHeader title="설정" backBtn />
      <section className="mt-3 flex items-start justify-between">
        <h3 className="font-medium text-gray1">알림</h3>
        <button
          type="button"
          className={`flex h-7 w-12 items-center rounded-full p-1 ${isActive ? 'bg-green-500' : 'bg-gray3'}`}
          aria-label="알림 토글 버튼"
          onClick={handleNotification}
        >
          <div
            className={`size-5 rounded-full shadow-md transition-transform ${isActive ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray4'}`}
          />
        </button>
      </section>
    </>
  );
}
