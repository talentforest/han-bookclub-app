/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyA6HW3pwkb-agsEpSYWGmlYSuvFiJDxp5c",
  authDomain: "han-bookclub.firebaseapp.com",
  projectId: "han-bookclub",
  storageBucket: "han-bookclub.appspot.com",
  messagingSenderId: "1033530409448",
  appId: "1:1033530409448:web:aff6942a34c0a48c81645d",
  measurementId: "G-925LMFR6FK"
};

firebase.initializeApp(firebaseConfig);

/* eslint-disable no-restricted-globals */
/* ✅ 서비스 워커 설치 이벤트 리스너 */
self.addEventListener('install', function () {
  self.skipWaiting();
});

/* ✅ 서비스 워커 활성화 이벤트 리스너 */
self.addEventListener('activate', (e) => {
  e.waitUntil(
    clients.claim() // 클라이언트 제어 권한 획득
  );
});

const messaging = firebase.messaging();

/* ✅ 백그라운드 상태일때 알림 수신 */
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = { body: payload.notification.body };

  self.registration.showNotification(notificationTitle, notificationOptions);
});