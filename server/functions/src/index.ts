import { onCall, HttpsError } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';

interface NotificationData {
  title: string;
  body: string;
  link: string;
}

export interface FcmUnicastData extends NotificationData {
  token: string;
}

export interface FcmMulticastData extends NotificationData {
  uid: string;
}

admin.initializeApp();

const db = admin.firestore();

export const sendUnicast = onCall(async (request: { data: FcmUnicastData }) => {
  const {
    data: { token, title, body, link },
  } = request;

  if (!token) {
    throw new HttpsError('not-found', '토큰이 없습니다');
  }

  const message = {
    data: {
      title,
      body,
      link,
    },
    token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return { success: true, response };
  } catch (error) {
    console.log('Error sending message:', error);
    throw new HttpsError(
      'internal',
      '알림 전송 중 오류가 발생했습니다.',
      error
    );
  }
});

export const sendMulticast = onCall(
  async (request: { data: FcmMulticastData }) => {
    const {
      data: { title, body, link, uid },
    } = request;

    const tokensSnapshot = await db.collection('FCMNotification').get();
    const tokens = tokensSnapshot.docs
      .filter((doc) => doc.id !== uid)
      .map((doc) => doc.data().tokens)
      .flat()
      .filter((token) => typeof token === 'string' && token.trim() !== '');

    if (tokens.length === 0) {
      throw new HttpsError('not-found', '토큰이 없습니다');
    }

    const message = {
      data: {
        title,
        body,
        link, // 클릭 시 이동할 URL을 data에 포함
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      console.log('Successfully sent message:', response);
      return { success: true, response };
    } catch (error) {
      console.log('Error sending message:', error);
      throw new HttpsError(
        'internal',
        '알림 전송 중 오류가 발생했습니다.',
        error
      );
    }
  }
);
