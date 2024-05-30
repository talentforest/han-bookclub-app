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

  const {
    notification: { title, body },
    data,
  } = e.data.json();

  const iconUrl =
    'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg';

  const options = {
    body,
    icon: iconUrl,
    actions: [
      { title: '화면보기', action: 'goTab' },
      { title: '닫기', action: 'close' },
    ],
    data,
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();

  const link = e.notification.data.url;

  if (!e.action) {
    // 기본 알림 클릭 동작 (버튼 클릭이 아닌 경우)
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
  }

  switch (e.action) {
    case 'goTab':
      e.waitUntil(
        clients
          .matchAll({
            type: 'window',
          })
          .then((clientList) => {
            for (const client of clientList) {
              if (client.url === link && 'focus' in client)
                return client.focus();
            }
            if (clients.openWindow) return clients.openWindow(link);
          })
      );
      break;

    case 'close':
      break;

    default:
      console.log(`Unknown action clicked: '${e.action}'`);
      break;
  }
});
