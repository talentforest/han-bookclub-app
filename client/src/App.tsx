import { useEffect, useState } from 'react';

import './index.css';
import Router from '@/Router';
import { dbService, getDeviceToken, storageService } from '@/fbase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import { userFcmSelectorFamily } from '@/data/fcmAtom';
import { basePhotoAtom } from '@/data/userAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { FCM_NOTIFICATION } from '@/appConstants';

import { formatDate } from '@/utils';

import LoopLoading from '@/components/common/LoopLoading';

function App() {
  const [init, setInit] = useState(false);

  const [currUser, setCurrUser] = useRecoilState(currAuthUserAtom);

  const { data: currUserFcm } = useRecoilValue(
    userFcmSelectorFamily(currUser?.uid),
  );

  const setBasePhoto = useSetRecoilState(basePhotoAtom);

  const getBasePhoto = async () => {
    const imgName = 'avatars/한페이지로고.jpeg';
    const originalFileRef = ref(storageService, imgName);
    const url = await getDownloadURL(originalFileRef);
    setBasePhoto(url);
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, user => {
      if (!user) return setCurrUser(null);

      const { uid, displayName, email, photoURL } = user;
      setCurrUser({ uid, displayName, email, photoURL });
      getBasePhoto();

      setInit(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (init && currUserFcm?.notification === true) {
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
  }, [currUserFcm]);

  return init ? <Router isLoggedIn={Boolean(currUser)} /> : <LoopLoading />;
}

export default App;
