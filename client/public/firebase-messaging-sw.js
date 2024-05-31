/* eslint-disable no-undef */
importScripts(
  'https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js'
);

importScripts(
  'https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js'
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

firebase.initializeApp(firebaseConfig);

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

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const {
    data: { title, body, link },
    fcmMessageId,
  } = e.data.json();

  const icon =
    'https://talentforest.github.io/han-bookclub-app/hanpage_shortcut_logo.jpeg';

  const options = {
    body,
    icon,
    data: { link },
    tag: fcmMessageId,
  };

  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function (e) {
  e.notification.close();

  const link = e.notification.data.link;

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
