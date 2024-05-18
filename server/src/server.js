import express from 'express';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    privateKey: process.env.FB_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FB_CLIENT_EMAIL,
  }),
});

const db = admin.firestore();

const defaultLink = 'https://talentforest.github.io/han-bookclub-app/';

app.post('/api/send-notification', async (req, res) => {
  const { token, title, body, link } = req.body;

  const message = {
    notification: {
      title,
      body,
    },
    webpush: {
      fcm_options: {
        link: link || defaultLink,
      },
      notification: {
        icon: '/han-bookclub-app/hanpage_logo.png',
      },
    },
    token,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log('Successfully sent message:', response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      res.sendStatus(500);
    });
});

app.post('/api/send-multicast', async (req, res) => {
  const { title, body, link } = req.body;

  try {
    // 모든 사용자 토큰 문서 가져오기
    const usersSnapshot = await db.collection('FCMNotification').get();

    const tokens = [];

    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData) {
        tokens.push(userData.token);
      }
    });

    if (tokens.length === 0) {
      return res.status(404).send('No FCM tokens found');
    } else {
      // 푸시 알림 메시지
      const message = {
        notification: {
          title,
          body,
        },
        webpush: {
          fcm_options: {
            link: link || defaultLink,
          },
          notification: {
            icon: '/han-bookclub-app/hanpage_logo.png',
          },
        },
        tokens,
      };

      // 모든 토큰에 푸시 알림 보내기
      const response = await admin.messaging().sendMulticast(message);
      console.log('Successfully sent message:', response);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log('Error sending message:', error);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
