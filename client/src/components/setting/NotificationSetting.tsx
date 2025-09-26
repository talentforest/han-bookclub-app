import { useEffect, useState } from 'react';

import { authService, dbService, getDeviceToken } from '@/fbase';
import { doc, setDoc, updateDoc } from 'firebase/firestore';

import { useRecoilState, useRecoilValue } from 'recoil';

import { currUserFcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { FCM_NOTIFICATION } from '@/appConstants';

import { useSendPushNotification } from '@/hooks';

import { formatDate } from '@/utils';

import { NotificationData } from '@/types';

import MobileHeader from '@/layout/mobile/MobileHeader';

export default function NotificationSetting() {
  const [isActive, setIsActive] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [currUserFcm, setCurrUserFcm] = useRecoilState(currUserFcmState);

  const { uid } = useRecoilValue(currAuthUserAtom);

  const anonymous = authService.currentUser?.isAnonymous;

  const { sendPushNotificationToUser, isPending } = useSendPushNotification();

  const saveFcmDataInDB = async () => {
    const token = await getDeviceToken();

    if (currUserFcm?.tokens?.includes(token)) return;

    const document = doc(dbService, FCM_NOTIFICATION, uid);

    const defaultFcmData = {
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
      notification: true,
      tokens:
        currUserFcm.tokens && currUserFcm.tokens?.length > 0
          ? [...currUserFcm?.tokens, token]
          : [token],
    };

    if (!currUserFcm.notification) {
      await setDoc(document, defaultFcmData);
    }

    if (currUserFcm.notification) {
      await updateDoc(document, defaultFcmData);
    }

    setCurrUserFcm(defaultFcmData);
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

    if (Notification.permission === 'denied') {
      return alert(
        '현재 앱알림이 거부된 상태입니다. 모바일이라면 휴대폰 앱 설정에 들어가서 알림 설정을 켜주세요. 브라우저라면 브라우저 설정에 들어가서 알림 설정을 허용으로 변경해주세요. 안된다면 개발자에게 문의해주세요.',
      );
    }

    const notificationData: NotificationData = {
      title: '💌알림 시작 안내',
      body: '이제부터 독서모임 한페이지에서 유용한 알림들을 보내드릴게요❣️',
      notification: true,
    };

    if (Notification.permission === 'granted') {
      await saveFcmDataInDB();
      await sendPushNotificationToUser(notificationData);
    } else {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        await saveFcmDataInDB();
        await sendPushNotificationToUser(notificationData);
      }
    }

    setIsActive(true);
    setIsDisabled(false);
  };

  const onRefuseClick = async () => {
    const document = doc(dbService, FCM_NOTIFICATION, uid);

    const fcmData = {
      notification: false,
      createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
    };

    await setDoc(document, fcmData);
    setIsActive(prev => !prev);
    setIsDisabled(false);
  };

  const handleNotification = () => {
    setIsDisabled(true);
    isActive ? onRefuseClick() : onPermitClick();
  };

  useEffect(() => {
    if (currUserFcm?.notification && Notification.permission === 'granted') {
      setIsActive(true);
    }
  }, [currUserFcm?.notification]);

  return (
    <>
      <MobileHeader title="설정" backBtn />
      <main className="flex justify-between">
        <h3 className="font-medium text-gray1">알림</h3>
        <button
          type="button"
          className={`flex h-7 w-12 items-center rounded-full p-1 disabled:opacity-20 ${isActive ? 'bg-green-500' : 'bg-gray3'}`}
          aria-label="알림 토글 버튼"
          onClick={handleNotification}
          disabled={isPending || isDisabled}
        >
          <div
            className={`size-5 rounded-full shadow-md transition-transform ${isActive ? 'translate-x-5 bg-white' : 'translate-x-0 bg-gray4'}`}
          />
        </button>
      </main>
    </>
  );
}
