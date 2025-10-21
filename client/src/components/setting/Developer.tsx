import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currUserFcmState } from '@/data/fcmAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { FCM_NOTIFICATION } from '@/appConstants';
import { DEVELOPER_EMAIL } from '@/appConstants/account';

import { useSendPushNotification } from '@/hooks';

import { getDDay, thisMonth, thisYear, thisYearMonthId } from '@/utils';

import { NotificationData, UserFcm } from '@/types';

import MobileHeader from '@/layout/MobileHeader';

import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import UserImgName from '@/components/common/user/UserImgName';

export default function Developer() {
  const { email } = useRecoilValue(currAuthUserAtom);

  const currUserFcm = useRecoilValue(currUserFcmState);

  const thisMonthClub = useRecoilValue(clubByMonthSelector(thisYearMonthId));

  const [userFcmList, setUserFcmList] = useState<UserFcm[]>([]);

  const {
    sendPushNotificationToUser,
    sendPushNotificationToAllUser,
    isPending,
  } = useSendPushNotification();

  const navigate = useNavigate();

  useEffect(() => {
    if (email !== DEVELOPER_EMAIL) {
      navigate(-1);
    }
    getCollection(FCM_NOTIFICATION, setUserFcmList);
  }, []);

  const meetingDDay = getDDay(thisMonthClub.meeting.time);

  const challengeDDay = getDDay('2025-12-21');

  return (
    <>
      <MobileHeader title="개발자도구" backBtn />

      <main>
        <Section title="알림 테스트">
          <div className="flex flex-wrap gap-3">
            <SquareBtn
              name="나에게 알림"
              handleClick={async () => {
                const notificationData: NotificationData = {
                  title: '🚀알림테스트',
                  body: '나에게만 알림 보내기🔥',
                  notification: currUserFcm.notification,
                };

                const sendNotification =
                  await sendPushNotificationToUser(notificationData);

                if (sendNotification.result === 'success') {
                  window.alert('알림을 보냈습니다!');
                }
              }}
              disabled={isPending}
            />
            <SquareBtn
              color="purple"
              name="모든 멤버에게 알림"
              handleClick={async () => {
                const notification = {
                  title: '🚀알림테스트',
                  body: '알림을 잘 받았나요?🔥',
                };

                await sendPushNotificationToUser({
                  ...notification,
                  notification: currUserFcm.notification,
                });

                await sendPushNotificationToAllUser(notification);

                window.alert('알림을 보냈습니다!');
              }}
              disabled={isPending}
            />
          </div>
        </Section>

        <Section title="특정 멤버에게 알림 테스트">
          <ul className="flex flex-wrap gap-3">
            {userFcmList.map(userFcm => (
              <li key={userFcm.id}>
                <SquareBtn
                  color="blue"
                  name="에게 알림"
                  handleClick={async () => {
                    const notificationData = {
                      title: '🚀알림 테스트',
                      body: '알림을 잘 받았나요?',
                      notification: currUserFcm.notification,
                    };

                    const result = await sendPushNotificationToUser(
                      notificationData,
                      userFcm,
                    );

                    if (result?.result === 'success') {
                      window.alert('알림을 보냈습니다!');
                    }
                  }}
                  disabled={isPending}
                >
                  <UserImgName userId={userFcm.id} isLink={false} />
                </SquareBtn>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="모임 종료 알림">
          <SquareBtn
            name={`${+thisMonth}월 독서모임 종료 알림`}
            handleClick={async () => {
              const notificationData = {
                title: `☕️${+thisMonth}월 독서모임 종료`,
                body: '독서모임이 종료되었습니다. 기억에 남는 이야기가 있었다면 모임 후기에 작성해보세요🔥',
                notification: currUserFcm.notification,
              };
              await sendPushNotificationToUser(notificationData);
              await sendPushNotificationToAllUser(notificationData);
              window.alert('이번달 독서모임 종료 알림을 모두에게 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>

        <Section title="모임 임박 알림">
          <SquareBtn
            name={`${+thisMonth}월 독서모임 임박 알림 DDAY: ${meetingDDay}일`}
            handleClick={async () => {
              const notificationData = {
                title: `☕️${+thisMonth}월 독서모임이 임박했어요!`,
                body: `${meetingDDay}일 후 독서모임이 시작됩니다. 모임책을 완독하세요🔥`,
                notification: currUserFcm.notification,
              };
              await sendPushNotificationToUser(notificationData);
              await sendPushNotificationToAllUser(notificationData);
              window.alert('이번달 독서모임 임박 알림을 모두에게 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>

        <Section title="챌린지 디데이 알림">
          <SquareBtn
            name={`${+thisYear}년 챌린지 DDAY: ${challengeDDay}일`}
            handleClick={async () => {
              const notificationData = {
                title: `☕️${+thisYear}년 재독 챌린지 DDAY 알림`,
                body: `챌린지 종료까지 ${challengeDDay}일 남았습니다. 모임책 한권을 재독해봐요!🔥`,
                notification: currUserFcm.notification,
              };
              await sendPushNotificationToUser(notificationData);
              await sendPushNotificationToAllUser(notificationData);
              window.alert('챌린지 디데이 알림을 모두에게 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>
      </main>
    </>
  );
}
