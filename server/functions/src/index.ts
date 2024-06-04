import { onCall, HttpsError } from 'firebase-functions/v2/https';
import admin from 'firebase-admin';
import cron from 'node-cron';

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

type Month =
  | '1월'
  | '2월'
  | '3월'
  | '4월'
  | '5월'
  | '6월'
  | '7월'
  | '8월'
  | '9월'
  | '10월'
  | '11월'
  | '12월';

interface PenaltyType {
  overdueHostReviewMonths: Month[];
  overdueSubjectMonths: Month[];
  overdueAbsenceMonths: Month[];
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

const now = new Date();

const getToday = (type: 'year' | 'month') => {
  return now
    .toLocaleDateString(
      'ko-KR',
      type === 'year' ? { year: 'numeric' } : { month: '2-digit' }
    )
    .slice(0, -1);
};

const thisYear = getToday('year');
const thisMonth = getToday('month');

export const thisYearMonthId = `${thisYear}-${thisMonth}`;

function getLastDayOfMonth(year = +thisYear, month = +thisMonth): Date {
  let date = new Date(year, month, 1);
  date.setDate(date.getDate() - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}

const updatePenaltyMonth = async (
  postType: '발제문' | '정리 기록' | '불참 후기'
) => {
  const subjectsDocSnapshot = await db
    .collection(`BookClub-${thisYear}/${thisYearMonthId}/Subjects`)
    .get();

  const bookFieldAndHostDocSnapshot = await db
    .collection('BookFieldAndHost')
    .doc(thisYear)
    .get();

  const penaltyDocSnapshot = await db.collection('Penalty').doc(thisYear).get();
  const penalty = penaltyDocSnapshot.data();

  // 호스트들 배열
  const hostsOfThisMonth = bookFieldAndHostDocSnapshot
    .data()
    ?.info.find((item: any) => item.month === +thisMonth).hosts;

  const hasSubjectOfHost = subjectsDocSnapshot.docs?.find((doc) =>
    hostsOfThisMonth.includes(doc.data().creatorId)
  );

  if (penalty && !hasSubjectOfHost) {
    const penaltyKeyObj: { [key: string]: keyof PenaltyType } = {
      발제문: 'overdueSubjectMonths',
      '정리 기록': 'overdueHostReviewMonths',
      '불참 후기': 'overdueAbsenceMonths',
    };

    const penaltyType = penaltyKeyObj[postType];

    const monthToAdd = `${+thisMonth}월` as Month;

    const updateData: { [key: string]: PenaltyType } = {};

    hostsOfThisMonth.forEach((host: string) => {
      const penaltyMonthList = penalty[host][penaltyType];
      // 이번달이 이미 리스트 안에 있으면 리턴
      if (penaltyMonthList.includes(monthToAdd)) {
        console.log(postType, '✅:', '이미 페널티가 추가되어 있습니다.');
        return;
      }
      // 업데이트할 달 추가
      updateData[`${host}.${[penaltyType]}`] =
        penaltyMonthList.length !== 0
          ? ([...penaltyMonthList, monthToAdd] as any)
          : ([monthToAdd] as any);
    });

    if (Object.keys(updateData).length !== 0) {
      await db.collection('Penalty').doc(thisYear).update(updateData);
    }
  }
};

// ✅ 발제문 => 설정된 모임날짜를 가져와서 이틀 전 금요일 자정 기한
export const checkOverdueSubject = onCall(async () => {
  // 매달 셋째 주 일요일: 0 0 15-21 * 0
  cron.schedule('0 0 15-21 * 0', async () => {
    if (now.getDay() === 5) {
      // 금요일
      await updatePenaltyMonth('발제문');
    }
  });
});

// ✅ 정리 기록, 불참 후기 => 매달 마지막 날 기한
export const checkOverdueLasyDay = onCall(async () => {
  cron.schedule('0 0 28-31 * 0', async () => {
    const lastDayOfMonth = getLastDayOfMonth();
    if (lastDayOfMonth.getDate() === now.getDate()) {
      await updatePenaltyMonth('정리 기록');
    }
  });
});
