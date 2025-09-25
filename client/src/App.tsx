import { useEffect, useState } from 'react';

import './index.css';
import Router from '@/Router';
import { dbService, getDeviceToken, storageService } from '@/fbase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import { useRecoilState, useSetRecoilState } from 'recoil';

import { basePhotoAtom } from '@/data/clubAtom';
import { currUserFcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getDocument } from '@/api';

import { FCM_NOTIFICATION } from '@/appConstants';

import { formatDate } from '@/utils';

import LoopLoading from '@/components/common/LoopLoading';

function App() {
  const [init, setInit] = useState(false);
  const [currUser, setCurrUser] = useRecoilState(currAuthUserAtom);
  const [currUserFcm, setCurrUserFcm] = useRecoilState(currUserFcmState);
  const setBasePhoto = useSetRecoilState(basePhotoAtom);

  const getBasePhoto = async () => {
    const originalFileRef = ref(
      storageService,
      `avatars/한페이지로고.jpeg`,
    );
    getDownloadURL(originalFileRef).then(url => {
      setBasePhoto(url);
    });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, displayName, email, photoURL } = user;
        setCurrUser({ uid, displayName, email, photoURL });
        getBasePhoto();
      } else {
        setCurrUser(null);
      }
      setInit(true);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (currUser?.uid) {
      getDocument(FCM_NOTIFICATION, currUser.uid, setCurrUserFcm);
    }
  }, [currUser?.uid]);

  useEffect(() => {
    if (init) {
      if (currUserFcm?.notification === true) {
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
                createdAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
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
    }
  }, [currUserFcm]);

  return init ? (
    <Router isLoggedIn={Boolean(currUser)} />
  ) : (
    <div className="flex h-screen items-center justify-center">
      <LoopLoading size={120} />
    </div>
  );
}

export default App;
