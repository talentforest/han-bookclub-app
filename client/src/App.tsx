import { useEffect, useState } from 'react';

import './index.css';
import Router from '@/Router';
import { dbService, getDeviceToken } from '@/fbase';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilState } from 'recoil';

import { fcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { FCM_NOTIFICATION } from '@/appConstants';

import { formatDate } from '@/utils';

import LoopLoading from '@/components/common/LoopLoading';

function App() {
  const [init, setInit] = useState(false); // 초기화
  const [currUser, setCurrUser] = useRecoilState(currAuthUserAtom);
  const [currentUserFcm, setCurrentUserFcm] = useRecoilState(fcmState);

  const user = getAuth().currentUser;

  useEffect(() => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      setCurrUser({ uid, displayName, email, photoURL });
      setInit(true);
    }
  }, [user]);

  useEffect(() => {
    if (currUser?.uid) {
      getDocument(FCM_NOTIFICATION, currUser.uid, setCurrentUserFcm);
    }
  }, [currUser?.uid]);

  useEffect(() => {
    if (currentUserFcm?.notification === true) {
      const compareToken = async () => {
        if (Notification.permission === 'granted') {
          const token = await getDeviceToken();

          const isExistTokenInDB = currentUserFcm?.tokens?.find(
            fcmToken => fcmToken === token,
          );

          if (isExistTokenInDB) return;

          if (!isExistTokenInDB && currUser?.uid) {
            const document = doc(dbService, FCM_NOTIFICATION, currUser.uid);
            const fcmData = {
              createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
              tokens:
                currentUserFcm?.tokens?.length !== 0
                  ? [...currentUserFcm?.tokens, token]
                  : [token],
            };
            await updateDoc(document, fcmData);
          }
        }
      };

      compareToken();
    }
  }, [currentUserFcm]);

  return init ? (
    <Router isLoggedIn={Boolean(currUser)} />
  ) : (
    <div className="flex h-screen items-center justify-center">
      <LoopLoading size={120} />
    </div>
  );
}

export default App;
