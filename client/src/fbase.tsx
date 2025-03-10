import { initializeApp } from 'firebase/app';
// import { ReCaptchaV3Provider, initializeAppCheck } from 'firebase/app-check';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions';
import { getMessaging, getToken } from 'firebase/messaging';
import { getStorage } from 'firebase/storage';

interface NotificationData {
  title: string;
  body: string;
  link: string;
}

export interface FcmUnicastData extends NotificationData {
  token: string;
}

export interface FcmMulticastData extends NotificationData {
  uid: string;
}

interface CallableResult {
  successCount: number;
  failureCount: number;
}

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

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(process.env.REACT_APP_APP_CHECK_SITE_KEY),
//   isTokenAutoRefreshEnabled: true,
// });

export const authService = getAuth();
export const reauth = reauthenticateWithCredential;
export const dbService = getFirestore();
export const storageService = getStorage();
const messaging = getMessaging(app);
const functions = getFunctions();

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export const getDeviceToken = async () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_MESSAGING_TOKEN,
    serviceWorkerRegistration: await navigator.serviceWorker.register(
      '/han-bookclub-app/firebase-messaging-sw.js',
    ),
  });
};

export const sendUnicast = httpsCallable<FcmUnicastData, CallableResult>(
  functions,
  'sendUnicast',
);

export const sendMulticast = httpsCallable<FcmMulticastData, CallableResult>(
  functions,
  'sendMulticast',
);
