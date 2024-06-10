import { initializeApp } from 'firebase/app';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from 'firebase/functions';

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
export const authService = getAuth();
export const reauth = reauthenticateWithCredential;
export const dbService = getFirestore();
export const storageService = getStorage();
const messaging = getMessaging(app);
const functions = getFunctions();

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

onMessage(messaging, (payload) => {
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: 'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg',
  });
});

export const getDeviceToken = async () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_MESSAGING_TOKEN,
    serviceWorkerRegistration: await navigator.serviceWorker.register(
      '/han-bookclub-app/firebase-messaging-sw.js'
    ),
  });
};

export const sendUnicast = httpsCallable<FcmUnicastData, CallableResult>(
  functions,
  'sendUnicast'
);

export const sendMulticast = httpsCallable<FcmMulticastData, CallableResult>(
  functions,
  'sendMulticast'
);
