import { initializeApp } from 'firebase/app';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken } from 'firebase/messaging';
import axios from 'axios';

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

export const sendPushNotification = (title: string, body: string) => {
  getDeviceToken()
    .then((token) => {
      if (token) {
        if (Notification.permission === 'granted') {
          pushNotification(token, title, body);
        } else if (Notification.permission !== 'denied') {
          Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
              pushNotification(token, title, body);
            }
          });
        }
      }
    })
    .catch((error) => {
      console.log('Error : ', error);
    });
};

const getDeviceToken = async () => {
  return getToken(messaging, {
    vapidKey: process.env.REACT_APP_MESSAGING_TOKEN,
    serviceWorkerRegistration: await navigator.serviceWorker.register(
      '/han-bookclub-app/firebase-messaging-sw.js'
    ),
  });
};

export const pushNotification = async (
  token: string,
  title: string,
  body: string
) => {
  return axios
    .post(
      '//fcm.googleapis.com//v1/projects/han-bookclub/messages:send',
      {
        to: token,
        notification: {
          body,
          title,
          icon: `${process.env.PUBLIC_URL}/hanpage_logo.png`,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.REACT_APP_MESSAGING_SERVER_KEY}`,
        },
      }
    )
    .then((res) => {
      console.log(res.data, res.config.data);
    })
    .catch((error) => {
      console.log('Error : ', error);
    });
};
