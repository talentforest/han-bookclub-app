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

  const message: admin.messaging.Message = {
    notification: {
      title,
      body,
    },
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

    return {
      success: true,
      response,
    };
  } catch (error: any) {
    console.error('Error sending message:', error);

    if (error?.code === 'messaging/registration-token-not-registered') {
      const snapshot = await db
        .collection('FCMNotification')
        .where('tokens', 'array-contains', token)
        .get();

      await Promise.all(
        snapshot.docs.map(async (doc) => {
          const savedTokens = doc.data().tokens;

          if (!Array.isArray(savedTokens)) {
            return;
          }

          const updatedTokens = savedTokens.filter(
            (savedToken: unknown) => savedToken !== token,
          );

          await doc.ref.update({
            tokens: updatedTokens,
          });
        }),
      );

      throw new HttpsError(
        'not-found',
        '만료된 알림 토큰입니다. 토큰을 다시 등록해 주세요.',
      );
    }

    throw new HttpsError(
      'internal',
      '알림 전송 중 오류가 발생했습니다.',
      error,
    );
  }
});

export const sendMulticast = onCall(
  async (request: { data: FcmMulticastData }) => {
    const {
      data: { title, body, link, uid },
    } = request;

    const tokensSnapshot = await db.collection('FCMNotification').get();

    const tokens: string[] = tokensSnapshot.docs
      .filter((doc) => doc.id !== uid)
      .filter((doc) => doc.data().notification)
      .flatMap((doc) => {
        const savedTokens = doc.data().tokens;

        return Array.isArray(savedTokens) ? savedTokens : [];
      })
      .filter(
        (token): token is string =>
          typeof token === 'string' && token.trim() !== '',
      );

    if (tokens.length === 0) {
      throw new HttpsError('not-found', '토큰이 없습니다');
    }

    const message: admin.messaging.MulticastMessage = {
      notification: {
        title,
        body,
      },
      data: {
        title,
        body,
        link,
      },
      tokens,
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);

      const invalidTokens = tokens.filter((_, index) => {
        const errorCode = response.responses[index].error?.code;

        return errorCode === 'messaging/registration-token-not-registered';
      });

      if (invalidTokens.length > 0) {
        await Promise.all(
          invalidTokens.map(async (invalidToken) => {
            const snapshot = await db
              .collection('FCMNotification')
              .where('tokens', 'array-contains', invalidToken)
              .get();

            await Promise.all(
              snapshot.docs.map(async (doc) => {
                const savedTokens = doc.data().tokens;

                if (!Array.isArray(savedTokens)) {
                  return;
                }

                const updatedTokens = savedTokens.filter(
                  (savedToken: unknown) => savedToken !== invalidToken,
                );

                await doc.ref.update({
                  tokens: updatedTokens,
                });
              }),
            );
          }),
        );
      }

      console.log(
        `Successfully sent ${response.successCount} messages; ` +
          `${response.failureCount} failed.`,
      );

      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('Error sending multicast message:', error);

      throw new HttpsError(
        'internal',
        '알림 전송 중 오류가 발생했습니다.',
        error,
      );
    }
  },
);
