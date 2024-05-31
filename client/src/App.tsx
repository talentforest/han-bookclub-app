import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { ResetStyle } from 'theme/resetStyle';
import { theme } from 'theme/theme';
import { ThemeProvider } from 'styled-components';
import { currentUserState } from 'data/userAtom';
import { useRecoilState } from 'recoil';
import { dbService, getDeviceToken } from 'fbase';
import { getDocument } from 'api/getFbDoc';
import { FCM_NOTIFICATION } from 'constants/index';
import { fcmState } from 'data/fcmAtom';
import { doc, updateDoc } from 'firebase/firestore';
import Router from './Router';
import Loading from './components/atoms/Loading';

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
    if (fcmDoc?.tokens && fcmDoc?.tokens?.length !== 0) {
      const compareToken = async () => {
        if (Notification.permission === 'granted') {
          const token = await getDeviceToken();

          const isExistTokenInDB = fcmDoc?.tokens?.find(
            (fcmToken) => fcmToken === token
          );

          if (isExistTokenInDB) {
            return;
          } else if (!isExistTokenInDB && userData?.uid) {
            const document = doc(dbService, FCM_NOTIFICATION, userData.uid);
            const fcmData = {
              createdAt: Date.now(),
              tokens: [...fcmDoc.tokens, token],
            };
            await updateDoc(document, fcmData);
          }
        }
      };
      compareToken();
    }
  }, [fcmDoc]);

  return (
    <ThemeProvider theme={theme}>
      <ResetStyle />
      {init ? <Router isLoggedIn={Boolean(userData)} /> : <Loading />}
    </ThemeProvider>
  );
}

export default App;
