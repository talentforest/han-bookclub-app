/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js'
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
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

// 서비스 워커 활성화 이벤트 리스너
self.addEventListener('activate', (event) => {
  event.waitUntil(
    clients.claim() // 클라이언트 제어 권한 획득
  );
});

messaging.onBackgroundMessage(function (payload) {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg',
    data: {
      url: payload.data.url, // URL 추가
    },
    tag: payload.messageId, // FCM 메시지 ID를 태그로 사용
  };

  self.registration.showNotification(
    `이건 서비스워커 알림: ${notificationTitle}`,
    notificationOptions
  );
});

// self.addEventListener('push', function (e) {
//   if (!e.data.json()) return;

//   const {
//     notification: { title, body },
//     data,
//     fcmMessageId,
//   } = e.data.json();

//   const iconUrl =
//     'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg';

//   const options = {
//     body,
//     icon: iconUrl,
//     data,
//     tag: fcmMessageId,
//   };

//   self.registration.showNotification(title, options);
// });

self.addEventListener('notificationclick', function (e) {
  e.notification.close();

  const link = e.notification.data.url;

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
