/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyA6HW3pwkb-agsEpSYWGmlYSuvFiJDxp5c',
  authDomain: 'han-bookclub.firebaseapp.com',
  projectId: 'han-bookclub',
  storageBucket: 'han-bookclub.appspot.com',
  messagingSenderId: '1033530409448',
  appId: '1:1033530409448:web:aff6942a34c0a48c81645d',
  measurementId: 'G-925LMFR6FK',
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-restricted-globals */
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
