import { useEffect, useState } from 'react';

import { getDocument } from 'api/firebase/getFbDoc';

import { fcmState } from 'data/fcmAtom';
import { currentUserState } from 'data/userAtom';
import { useRecoilState } from 'recoil';

import Router from './Router';
import Loading from './components/common/Loading';
import './index.css';
import { FCM_NOTIFICATION } from 'appConstants';
import { dbService, getDeviceToken } from 'fbase';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

function App() {
  const [init, setInit] = useState(false); // user가 null이 되지 않기 위해 초기화
  const [userData, setUserData] = useRecoilState(currentUserState);
  const [fcmDoc, setFcmDoc] = useRecoilState(fcmState);

  useEffect(() => {
    const user = getAuth().currentUser;
    setUserData({
      uid: user?.uid,
      displayName: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
    });
    setInit(true);
  }, []);

  useEffect(() => {
    if (userData?.uid) {
      getDocument(FCM_NOTIFICATION, userData.uid, setFcmDoc);
    }
  }, [userData?.uid]);

  useEffect(() => {
    if (fcmDoc?.notification === true) {
      const compareToken = async () => {
        if (Notification.permission === 'granted') {
          const token = await getDeviceToken();

          const isExistTokenInDB = fcmDoc?.tokens?.find(
            fcmToken => fcmToken === token,
          );

          if (isExistTokenInDB) return;
          if (!isExistTokenInDB && userData?.uid) {
            const document = doc(dbService, FCM_NOTIFICATION, userData.uid);
            const fcmData = {
              createdAt: Date.now(),
              tokens:
                fcmDoc?.tokens?.length !== 0
                  ? [...fcmDoc?.tokens, token]
                  : [token],
            };
            await updateDoc(document, fcmData);
          }
        }
      };

      compareToken();
    }
  }, [fcmDoc]);

  return init ? <Router isLoggedIn={Boolean(userData)} /> : <Loading />;
}

export default App;
