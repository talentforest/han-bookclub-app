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
    sendPushNotification,
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
              name="나에게 알림 보내기"
              handleClick={async () => {
                await sendPushNotificationToUser({
                  title: '🚀알림테스트',
                  body: '나에게만 알림 보내기🔥',
                });
                window.alert('알림을 보냈습니다!');
              }}
              disabled={isPending}
            />

            <SquareBtn
              color="purple"
              name="모든 멤버에게 알림 보내기"
              handleClick={() => {
                sendPushNotificationToAllUser({
                  title: '🚀알림테스트',
                  body: '모두에게 알림 보내기🔥',
                });
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
                    handleClick={() =>
                      sendPushNotificationToUser({
                        title: '🚀알림 테스트',
                        body: '알림을 잘 받았나요?',
                        userFcm,
                      })
                    }
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
            name={`${+thisMonth}월 모임 종료 알림`}
            handleClick={async () => {
              await sendPushNotification({
                title: `☕️${+thisMonth}월 모임 종료`,
                body: '독서모임이 종료되었습니다. 재미있었던 이야기가 있었다면 모임 후기를 작성해보세요.🔥',
              });
              window.alert('이번달 모임 종료 알림을 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>

        <Section title="모임 임박 알림">
          <SquareBtn
            name={`${+thisMonth}월 모임 임박 알림 #DDAY: ${meetingDDay}일`}
            handleClick={async () => {
              await sendPushNotification({
                title: `☕️${+thisMonth}월 모임이 임박했습니다!`,
                body: `${meetingDDay} 후 독서모임이 시작됩니다. 모임책을 완독하세요.🔥`,
              });
              window.alert('이번달 모임 임박 알림을 보냈습니다!');
            }}
            disabled={isPending}
          />
        </Section>
      </main>
    </>
  );
}
