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
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);

// const appCheck = initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider(import.meta.env.VITE_APP_CHECK_SITE_KEY),
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
    vapidKey: import.meta.env.VITE_MESSAGING_TOKEN,
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
