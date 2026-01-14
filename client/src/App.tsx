import { useEffect } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './index.css';
import { dbService, getDeviceToken } from '@/fbase';
import { arrayUnion, doc, setDoc } from 'firebase/firestore';

import { useRecoilValue } from 'recoil';

import { userFcmAtomFamily } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { FCM_NOTIFICATION } from '@/appConstants';

import { formatDate } from '@/utils';

import loginRoutes from '@/routes/loginRoutes';
import mainRoutes from '@/routes/mainRoutes';

import LoopLoading from '@/components/common/LoopLoading';

function App() {
  const { status: isCurrAuthLoading, data: currUser } =
    useRecoilValue(currAuthUserAtom);

  const { status: isCurrFcmLoading, data: currUserFcm } = useRecoilValue(
    userFcmAtomFamily(currUser?.uid),
  );

  const router = createBrowserRouter(
    Boolean(currUser) ? mainRoutes : loginRoutes,
    {
      basename: '/han-bookclub-app',
    },
  );

  useEffect(() => {
    if (isCurrFcmLoading !== 'loaded') return;
    if (currUserFcm?.notification !== true) return;
    if (!currUser?.uid) return;
    if (!('Notification' in window)) return;

    const compareToken = async () => {
      if (Notification.permission !== 'granted') return;
      try {
        const token = await getDeviceToken();
        if (!token) return;

        const documentRef = doc(dbService, FCM_NOTIFICATION, currUser.uid);

        await setDoc(
          documentRef,
          {
            updatedAt: formatDate(new Date(), "yyyy-MM-dd'T'HH:mm:ss"),
            tokens: arrayUnion(token),
          },
          { merge: true },
        );
      } catch (error) {
        console.error('compareToken failed', error);
      }
    };

    compareToken();
  }, [isCurrFcmLoading, currUserFcm?.notification, currUser?.uid]);

  return isCurrAuthLoading === 'loaded' && isCurrFcmLoading === 'loaded' ? (
    <RouterProvider router={router} />
  ) : (
    <LoopLoading />
  );
}

export default App;
