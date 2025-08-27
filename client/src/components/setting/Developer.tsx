import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { useRecoilValue } from 'recoil';

import { currAuthUserAtom } from '@/data/userAtom';

import { DEVELOPER_EMAIL } from '@/appConstants/account';

import { useSendPushNotification } from '@/hooks';

import MobileHeader from '@/layout/mobile/MobileHeader';

import SquareBtn from '@/components/common/button/SquareBtn';
import Section from '@/components/common/container/Section';

export default function Developer() {
  const { email } = useRecoilValue(currAuthUserAtom);

  const {
    sendNotificationToCurrentUser,
    sendNotificationToAllUser,
    isPending,
  } = useSendPushNotification();

  const navigate = useNavigate();

  useEffect(() => {
    if (email !== DEVELOPER_EMAIL) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <MobileHeader title="개발자도구" backBtn />
      <Section title="알림테스트">
        <div className="flex gap-5">
          <SquareBtn
            name="나에게 알림 보내기"
            handleClick={async () => {
              await sendNotificationToCurrentUser({
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
              sendNotificationToAllUser({
                title: '🚀알림테스트',
                body: '모두에게 알림 보내기🔥',
              });
              window.alert('알림을 보냈습니다!');
            }}
            disabled={isPending}
          />
        </div>
      </Section>
    </>
  );
}
