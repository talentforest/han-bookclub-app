/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

/* eslint-disable no-restricted-globals */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('push', function (e) {
  if (!e.data) return;

  const payload = e.data.json();
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/default-icon.png',
    data: {
      url: payload.notification.click_action || '/',
    },
  };

  e.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions)
  );
});
