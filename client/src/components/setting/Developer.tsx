import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { DEVELOPER_EMAIL } from 'appConstants/account';

import useSendPushNotification from 'hooks/useSendPushNotification';

import { currAuthUserAtom } from 'data/userAtom';
import { useRecoilValue } from 'recoil';

import SquareBtn from 'components/common/button/SquareBtn';
import Section from 'components/common/container/Section';

export default function Developer() {
  const { email } = useRecoilValue(currAuthUserAtom);

  const { sendNotificationToCurrentUser, sendNotificationToAllUser } =
    useSendPushNotification();

  const navigate = useNavigate();

  useEffect(() => {
    if (email !== DEVELOPER_EMAIL) {
      navigate(-1);
    }
  }, []);

  return (
    <Section title="알림테스트">
      <div className="flex gap-5">
        <SquareBtn
          name="나에게 알림 보내기"
          handleClick={() => {
            sendNotificationToCurrentUser({
              title: '🚀알림테스트',
              body: '나에게만 알림 보내기🔥',
            });
          }}
        />
        <SquareBtn
          color="purple"
          name="모든 멤버에게 알림 보내기"
          handleClick={() => {
            sendNotificationToAllUser({
              title: '🚀알림테스트',
              body: '모두에게 알림 보내기🔥',
            });
          }}
        />
      </div>
    </Section>
  );
}
