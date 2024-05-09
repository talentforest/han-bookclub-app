import { initializeApp } from 'firebase/app';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
export const authService = getAuth();
export const reauth = reauthenticateWithCredential;
export const dbService = getFirestore();
export const storageService = getStorage();
const messaging = getMessaging(app);

export const getDeviceToken = async (
  setDeviceToken: React.Dispatch<
    React.SetStateAction<{
      token: string;
    }>
  >
) => {
  getToken(messaging, {
    vapidKey: process.env.REACT_APP_MESSAGING_TOKEN,
    serviceWorkerRegistration: await navigator.serviceWorker.register(
      '/han-bookclub-app/firebase-messaging-sw.js'
    ),
  }).then((token) => setDeviceToken({ token }));
};
