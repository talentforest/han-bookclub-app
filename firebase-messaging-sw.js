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

const messaging = firebase.messaging();

/* eslint-disable no-restricted-globals */
self.addEventListener('install', function () {
  self.skipWaiting();
});

// 서비스 워커 활성화 이벤트 리스너
self.addEventListener('activate', (e) => {
  e.waitUntil(
    clients.claim() // 클라이언트 제어 권한 획득
  );
});

// messaging.onBackgroundMessage(messaging, (payload) => {
//   const icon =
//     'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg';

//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload
//   );

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: `onBackgroundMessage: ${payload.notification.body}`,
//     icon,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

self.addEventListener('push', (event) => {
  const eventData = event.data.json();

  const {
    notification: { body, title },
  } = eventData;

  const options = {
    body,
    icon: 'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg',
  };
  event.waitUntil(
    self.registration.showNotification(`푸시이벤트: ${title}`, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const link = event.notification.data.link;

  e.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === link && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(link);
      }
    })
  );
  return;
});
