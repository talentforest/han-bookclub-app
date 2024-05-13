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
