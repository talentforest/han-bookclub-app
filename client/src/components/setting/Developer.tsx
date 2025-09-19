import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { clubByMonthSelector } from '@/data/clubAtom';
import { currAuthUserAtom } from '@/data/userAtom';

import { getCollection } from '@/api';

import { FCM_NOTIFICATION } from '@/appConstants';
import { DEVELOPER_EMAIL } from '@/appConstants/account';

import { useSendPushNotification } from '@/hooks';

import { getDDay, thisMonth, thisYearMonthId } from '@/utils';

import { UserFcm } from '@/types';

import MobileHeader from '@/layout/mobile/MobileHeader';

import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';
import UserName from '@/components/common/user/UserName';

export default function Developer() {
  const { email } = useRecoilValue(currAuthUserAtom);

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

  return (
    <>
      <MobileHeader title="개발자도구" backBtn />

      <main>
        <Section title="알림 테스트">
          <div className="flex flex-wrap gap-3">
            <SquareBtn
              name="나에게 알림"
              handleClick={async () => {
                const notificationData = {
                  title: '🚀알림테스트',
                  body: '나에게만 알림 보내기🔥',
                };
                await sendPushNotificationToUser(notificationData);
                window.alert('알림을 보냈습니다!');
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
                await sendPushNotificationToUser(notification);
                await sendPushNotificationToAllUser(notification);
                window.alert('알림을 보냈습니다!');
              }}
              disabled={isPending}
            />
          </div>
        </Section>

        <Section title="특정 멤버에게 알림 테스트">
          <ul className="flex flex-wrap gap-3">
            {userFcmList
              .filter(user => user.notification)
              .map(userFcm => (
                <li key={userFcm.id}>
                  <SquareBtn
                    color="blue"
                    name="에게 알림"
                    handleClick={() => {
                      const notificationData = {
                        title: '🚀알림 테스트',
                        body: '알림을 잘 받았나요?',
                      };
                      sendPushNotificationToUser(notificationData, userFcm);
                      window.alert('알림을 보냈습니다!');
                    }}
                    disabled={isPending}
                  >
                    <UserName userId={userFcm.id} />
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
                title: `☕️${+thisMonth}월 독서모임이 종료됐어요`,
                body: '독서모임이 종료되었습니다. 기억에 남는 이야기가 있었다면 모임 후기에 작성해보세요🔥',
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
                body: `${meetingDDay} 후 독서모임이 시작됩니다. 모임책을 완독하세요🔥`,
              };
              await sendPushNotificationToUser(notificationData);
              await sendPushNotificationToAllUser(notificationData);
              window.alert('이번달 독서모임 임박 알림을 모두에게 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>
      </main>
    </>
  );
}
