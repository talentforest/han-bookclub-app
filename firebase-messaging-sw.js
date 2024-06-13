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
self.addEventListener('install', function () {
  self.skipWaiting();
});

// 서비스 워커 활성화 이벤트 리스너
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim() // 클라이언트 제어 권한 획득
  );
});

self.addEventListener('push', function (event) {
  if (event.data) {
    const icon =
      'https://talentforest.github.io/han-bookclub-app/hanpage_logo.png';

    const {
      data: { title, body, link },
    } = event.data.json();

    const options = {
      body,
      icon,
      data: {
        link,
      },
    };

    event.waitUntil(self.registration.showNotification(title, options));
  } else {
    console.log('푸시 이벤트 데이터가 없습니다.');
  }
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  const { link } = event.notification.data;

  event.waitUntil(
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
});
