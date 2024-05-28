/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js'
);

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
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

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

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/han-bookclub-app/hanpage_logo.png',
//   };

//   // eslint-disable-next-line no-restricted-globals
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
