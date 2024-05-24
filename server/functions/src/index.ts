import { onCall, HttpsError } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

export const sendUnicast = onCall(
  (request: { data: { token: string; title: string; body: string } }) => {
    const {
      data: { token, title, body },
    } = request;

    if (!token) {
      throw new HttpsError('not-found', '토큰이 없습니다');
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
      webpush: {
        fcmOptions: {
          link: 'https://talentforest.github.io/han-bookclub-app',
        },
      },
    };

    admin
      .messaging()
      .send(message)
      .then((response: any) => {
        return console.log('Successfully sent message:', response);
      })
      .catch((error: Error) => {
        return console.log('Error sending message:', error);
      });
  }
);

export const sendMulticast = onCall(
  async (request: { data: { title: string; body: string } }) => {
    const {
      data: { title, body },
    } = request;

    const tokensSnapshot = await db.collection('FCMNotification').get();
    const tokens = tokensSnapshot.docs.map((doc) => doc.data().token);

    if (tokens.length === 0) {
      throw new HttpsError('not-found', '토큰이 없습니다');
    }

    const message = {
      notification: {
        title,
        body,
      },
      tokens,
    };

    admin
      .messaging()
      .sendEachForMulticast(message)
      .then((response: any) => {
        return console.log('Successfully sent message:', response);
      })
      .catch((error: Error) => {
        return console.log('Error sending message:', error);
      });
  }
);
