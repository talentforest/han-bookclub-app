const { onRequest } = require('firebase-functions/v2/https');
const logger = require('firebase-functions/logger');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const dotenv = require('dotenv');
dotenv.config();

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors());

app.use(express.json());

const FCM_NOTIFICATION = 'FCMNotification';

const DEFAULT_LINK = 'https://talentforest.github.io/han-bookclub-app/';

app.post('/send-multicast', async (req, res) => {
  const { title, body, icon, link } = req.body;

  try {
    const usersSnapshot = await db.collection(FCM_NOTIFICATION).get();

    const tokens = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.token) {
        tokens.push(userData.token);
      }
    });

    if (tokens.length === 0) {
      return res.status(404).send('No FCM tokens found');
    }

    const message = {
      notification: {
        title,
        body,
      },
      webpush: {
        fcm_options: {
          link: link || DEFAULT_LINK,
        },
        notification: {
          icon,
        },
      },
      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    logger.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

app.post('/send-notification', async (req, res) => {
  const { token, title, body, icon, link } = req.body;

  try {
    if (!token) {
      return res.status(404).send('No FCM token found');
    }

    const message = {
      notification: {
        title,
        body,
      },
      webpush: {
        fcm_options: {
          link: link || DEFAULT_LINK,
        },
        notification: {
          icon,
        },
      },
      token,
    };

    const response = await admin.messaging().send(message);
    res.status(200).json({ message: 'Notification sent successfully' });
  } catch (error) {
    logger.error('Error sending message:', error);
    res.status(500).json({ error: 'Error sending message' });
  }
});

// 모든 요청을 처리하는 라우팅 설정
app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Firebase v2 형식으로 Cloud Function 내보내기
exports.api = onRequest(app);
