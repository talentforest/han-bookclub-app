import { initializeApp } from 'firebase/app';
import { getAuth, reauthenticateWithCredential } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
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

export const sendPushNotification = async (title: string, body: string) => {
  getDeviceToken()
    .then((token) => {
      if (Notification.permission === 'granted') {
        pushNotification(token, title, body);
      }

      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            pushNotification(token, title, body);
          }
        });
      }

      localNotification(); // 테스트
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
  axios
    .post(
      'https://fcm.googleapis.com/fcm/send',
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
          Authorization: `key=${process.env.REACT_APP_MESSAGING_SERVER_KEY}`,
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

export const localNotification = () => {
  const option: NotificationOptions = {
    body: '한페이지 독서모임',
    icon: `${process.env.PUBLIC_URL}/hanpage_logo.png`,
  };

  if (Notification.permission === 'granted') {
    const notification = new Notification('로컬 알림', option);
    return notification;
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        const notification = new Notification('로컬 알림', option);
        return notification;
      }
    });
  }
};

onMessage(messaging, (payload) => {
  console.log('알림 도착 ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  if (Notification.permission === 'granted') {
    new Notification(notificationTitle, notificationOptions);
  }
});
