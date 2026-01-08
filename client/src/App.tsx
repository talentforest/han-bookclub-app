import { useEffect } from 'react';

import './index.css';
import Router from '@/Router';
import { dbService, getDeviceToken } from '@/fbase';
import { doc, updateDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { userFcmSelectorFamily } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { FCM_NOTIFICATION } from '@/appConstants';

import { formatDate } from '@/utils';

import LoopLoading from '@/components/common/LoopLoading';

function App() {
  const { status: isCurrAuthLoading, data: currUser } =
    useRecoilValue(currAuthUserAtom);

  const { status: isCurrFcmLoading, data: currUserFcm } = useRecoilValue(
    userFcmSelectorFamily(currUser?.uid),
  );

  useEffect(() => {
    if (isCurrFcmLoading === 'loaded' && currUserFcm?.notification === true) {
      const compareToken = async () => {
        if (Notification.permission === 'granted') {
          const token = await getDeviceToken();

          const isExistTokenInDB = currUserFcm?.tokens?.find(
            fcmToken => fcmToken === token,
          );

          if (isExistTokenInDB) return;

          if (!isExistTokenInDB && currUser?.uid) {
            const document = doc(dbService, FCM_NOTIFICATION, currUser.uid);

            const fcmData = {
              updatedAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
              tokens:
                currUserFcm?.tokens?.length !== 0
                  ? [...currUserFcm?.tokens, token]
                  : [token],
            };
            await updateDoc(document, fcmData);
          }
        }
      };

      compareToken();
    }
  }, [isCurrFcmLoading, currUserFcm.notification, currUser?.uid]);

  return isCurrAuthLoading === 'loaded' && isCurrFcmLoading === 'loaded' ? (
    <Router isLoggedIn={Boolean(currUser)} />
  ) : (
    <LoopLoading />
  );
}

export default App;
